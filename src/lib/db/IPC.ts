import { Notification, Client as PGClient } from "pg"
import { EventEmitter } from "events"

const sleep = (seconds: number) => new Promise((r) => setTimeout(r, seconds*1000))
const RESERVED_CHANNELS = ["newListener", "removeListener", "notify", "unlisten", "listen", "error", "debug", "end"]

export default class PostgresIPCClient extends EventEmitter {

	protected client: PGClient = new PGClient(process.env.POSTGRES_CONN_URI)
	protected state: string = 'initial'

	constructor() {
		super()

		this._createClient()

		this.on("newListener", (channel: string) => {
			if (this.state === "connected" && !RESERVED_CHANNELS.includes(channel) && this.listenerCount(channel) === 0)
				this.dispatchListen(channel).catch(console.error)
		})

		this.on("removeListener", (channel: string) => {
			if (this.state === "connected" && !RESERVED_CHANNELS.includes(channel) && this.listenerCount(channel) === 0)
				this.dispatchUnlisten(channel).catch(console.error)
		})
	}

	get status() {
		return this.state;
	}

	async connect() {
		if (['initial', 'reconnecting'].includes(this.state)) {
			if (this.state === 'initial') this.state = "connecting"
			await this.client.connect()
			this.state = "connected"
			this.emit('debug', `PG-IPC Connected`)
			await this.addListens()
		}
	}

	protected async addListens() {
		const channels = this.eventNames().filter(v => !RESERVED_CHANNELS.includes(v as string))
		this.emit('debug', `PG-IPC adding listeners for channels [${channels.join(', ')}]`)
		const query = channels.map(channel => `LISTEN ${this.client.escapeIdentifier(channel as string)}`)
		await this.client.query(query.join(';')).catch(console.error)
	}

	protected async reconnect() {
		if (this.state === 'dead') {
			this.state = "reconnecting"
			this.emit('debug', `PG-IPC attempting reconnect after 5 seconds...`)
			await sleep(5)
			this._createClient()
			await this.connect().catch(err => this._reconnectError(err))
		}
	}

	protected async _reconnectError(err: Error) {
		this.state = 'dead'
		this.emit('debug', `PG-IPC failed to reconnect! ${err}`)
		this.reconnect()
	}

	async destroy() {
		if (this.state === "connected") {
			this.state = "ending"
			this.client.removeAllListeners()
			await this.client.query(`UNLISTEN *`)
			this.emit("end")
			this.removeAllListeners()
			await this.client.end()
			this.state = "disconnected"
			this.emit('debug', `PG-IPC Terminated`)
		}
	}

	protected _createClient() {
		this.client.removeAllListeners()
		this.client = new PGClient(process.env.POSTGRES_CONN_URI)
		this.client.on("notification", (msg) => this.onNotification(msg).catch(console.error))
		this.client.on("error", (error) => {
			if (this.state === "connected") {
				this.state = 'dead'
				this.emit('debug', `PG-IPC connection terminated unexpectedly! ${error}`)
				this.reconnect()
			}
		})
	}

	notify(channel: string, payload: any = null) {
		const encoded = typeof payload === "string" || payload === null ? payload : JSON.stringify(payload)
		const statement = `NOTIFY ${this.client.escapeIdentifier(channel)}` 
            + (encoded !== null ? `, ${this.client.escapeLiteral(encoded)}` : "")

		this.client.query(statement)
			.then(() => this.emit("notify", channel, payload))
			.catch(console.error)
	}

	protected async onNotification(msg: Notification) {
		if (msg.payload) msg.payload = JSON.parse(msg.payload)
        this.emit(msg.channel, msg)
	}

	protected async dispatchListen(channel: string) {
		await this.client.query(`LISTEN ${this.client.escapeIdentifier(channel)}`)
			.then(() => this.emit("listen", channel))
	}

	protected async dispatchUnlisten(channel: string) {
		await this.client.query(`UNLISTEN ${this.client.escapeIdentifier(channel)}`)
			.then(() => this.emit("unlisten", channel))
	}
}
