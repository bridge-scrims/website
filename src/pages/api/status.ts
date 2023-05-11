import discordConnection, { ScrimsClient } from "@/lib/DiscordBot"
import { NextApiRequest, NextApiResponse } from "next"
import dbConnection from "@/lib/db/connection"
import DBClient from "@/lib/db/Client"

function botData(bot: ScrimsClient | null) {
    if (!bot) return `Discord connection failed!`
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

function dbData(db: DBClient | null) {
    if (!db) return `Database initialization failed!`
    return {
        type: db.source.options.type,
        database: db.source.driver.database,
        ipc: db.ipc.status,
        entities: db.source.entityMetadatas.length,
        migrations: db.source.migrations.length
    }
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    const [bot, db] = await Promise.all([discordConnection(), dbConnection()])
    return res.status(200).json({
        database: dbData(db),
        bot: botData(bot)
    })
}
