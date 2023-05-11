import PostgresIPCClient from "postgres-ipc"
import { DataSource, Repository } from "typeorm"

import LinkingRequest from "./entities/LinkingRequest"

function requireAll(req: __WebpackModuleApi.RequireContext) {
    return req.keys().map((path) => Object.values(req(path))[0]) as Function[]
}

const Entities = {
    linkingRequests: LinkingRequest
}

const dataSource = new DataSource({
    type: "postgres",
    url: process.env.POSTGRES_CONN_URI,
    connectTimeoutMS: 10 * 1000,
    logging: !!process.env.DEBUG,
    logNotifications: !!process.env.DEBUG,
    entities: Object.values(Entities),
    migrations: requireAll(require.context("./migrations", true, /^\..*(?<!\.ts)$/)),
    migrationsRun: true,
    synchronize: false
})

export default class DBClient {
    readonly ipc: PostgresIPCClient
    readonly source: DataSource

    readonly linkingRequests!: Repository<LinkingRequest>

    constructor() {
        this.ipc = new PostgresIPCClient()
        this.source = dataSource
        Object.entries(Entities).forEach(([key, type]) =>
            Object.defineProperty(this, key, { value: this.source.getRepository(type) })
        )
    }

    async query(...query: (string | any[])[]) {
        if (query.length === 1 && query[0] instanceof Array) query = query[0]
        const queryString = query.filter((v) => typeof v === "string").join(" ")
        const params = query.filter((v) => v instanceof Array).flat()
        return this.source.query(queryString, params)
    }

    async call(pgFunction: string, params: Array<any> = []) {
        const functionParams = params.map((_, idx) => `$${idx + 1}`).join(", ")
        const query = [`SELECT ${pgFunction}(${functionParams})`, params]
        const res = await this.query(...query)
        return res?.[0]?.[pgFunction] ?? null
    }

    async initialize() {
        if (!process.env.POSTGRES_CONN_URI) throw new Error("POSTGRES_CONN_URI env var must be set!")
        try {
            await Promise.all([this.source.initialize(), this.ipc.connect()])
        } catch (err) {
            await this.destroy()
            throw err
        }
    }

    async destroy() {
        if (this.source.isInitialized) await this.source.destroy().catch(console.error)
        await this.ipc.destroy().catch(console.error)
    }
}
