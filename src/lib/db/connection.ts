import DBClient from "./Client"

export const client = new DBClient()
let connectPromise: Promise<DBClient | void> | null = null

export default async function dbConnection() {
    if (!connectPromise) {
        connectPromise = client.initialize()
            .then(() => client)
            .catch(console.error)
    }
    const db = await connectPromise
    return db || null
}