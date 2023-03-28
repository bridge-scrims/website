import DBClient from "./Client"

const client = new DBClient()
export default async function dbConnection() {
    await client.initialize()
    return client
}