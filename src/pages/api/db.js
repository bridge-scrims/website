import dbConnection from '../../database/connection'

export default async function handler(req, res) {
  const conn = await dbConnection()
  res.status(200).json({ 
    type: conn.source.options.type,
    database: conn.source.driver.database,
    entities: conn.source.entityMetadatas.length,
    migrations: conn.source.migrations.length
  })
}
