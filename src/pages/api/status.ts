import discordConnection, { ScrimsClient } from "@/lib/DiscordBot"
import { NextApiRequest, NextApiResponse } from "next"
import dbConnection from "@/lib/db/connection"
import DBClient from "@/lib/db/Client";

function botData(bot: ScrimsClient | Error) {
	if (bot instanceof Error) return `${bot}`;
	const shard = bot.ws.shards.first()
	return {
		user: bot.user?.tag,
		ws: {
			status: shard?.status,
			ping: shard?.ping
		},
		scrims: {
			name: bot.main.name,
			roles: bot.main.roles.cache.size,
			members: bot.main.members.cache.size
		}
	}
}

function dbData(db: DBClient | Error) {
	if (db instanceof Error) return `${db}`;
	return {
		type: db.source.options.type,
		database: db.source.driver.database,
		ipc: db.ipc.status,
		entities: db.source.entityMetadatas.length,
		migrations: db.source.migrations.length,
	}
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
	const bot = await discordConnection().catch(err => err)
	const db = await dbConnection().catch(err => err)
	return res.status(200).json({
		database: dbData(db),
		bot: botData(bot)
	})
}
