import { DataSource } from 'typeorm';

function requireAll(req) {
    return req.keys().map(path => Object.values(req(path))[0])
}

export default new DataSource({
    type: 'postgres',
    url: process.env.POSTGRES_CONN_URI,
    logging: !!process.env.DEBUG,
    entities: requireAll(require.context('./entities', true, /^\..*(?<!\.ts)$/)),
    migrations: requireAll(require.context('./migrations', true, /^\..*(?<!\.ts)$/)),
    migrationsRun: true,
    synchronize: false
})