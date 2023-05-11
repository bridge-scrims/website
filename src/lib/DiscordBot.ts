import { Client, GatewayIntentBits, Guild } from "discord.js"

const MAIN_GUILD = "759894401957888031"

export type ScrimsClient = Client & { main: Guild }

export const bot = new Client({
    intents: GatewayIntentBits.GuildMembers,
    shardCount: 1,
    rest: {
        timeout: 10_000
    }
})

let connectPromise: Promise<ScrimsClient | void> | null = null

export async function getHostMember(memberId: string) {
    const bot = await discordConnection()
    return bot?.main.members.cache.get(memberId)
}

export default async function discordConnection() {
    if (!connectPromise) {
        if (!process.env.DISCORD_TOKEN) throw new Error("DISCORD_TOKEN env var must be set!")
        connectPromise = bot
            .login(process.env.DISCORD_TOKEN)
            .then(() => console.log(`Connected to Discord as ${bot.user?.tag}`))
            .then(() => bot.guilds.fetch(MAIN_GUILD))
            .then(async (guild) => {
                Object.defineProperty(bot, "main", { value: guild })
                await guild.roles.fetch()
                await guild.members.fetch()
                console.log(
                    `Fetched ${guild.members.cache.size} members and ${guild.roles.cache.size} roles from host`
                )
                return bot as ScrimsClient
            })
            .catch(console.error)
    }
    const connected = await connectPromise
    return connected ?? null
}
