import { DataSource } from "typeorm"
import dataSource from "./ormconfig"

export default class DBClient {

	readonly source: DataSource = dataSource

	async initialize() {
		if (!this.source.isInitialized)
			await this.source.initialize()
	}

	async destroy() {
		await this.source.destroy().catch(console.error)
	}

}
