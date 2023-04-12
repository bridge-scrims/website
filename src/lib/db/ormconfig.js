import { DataSource } from 'typeorm';
import { globSync } from 'glob';

function requireAll(pattern) {
    return globSync(pattern)
        .filter(f => f.endsWith('.js'))
        .map(path => Object.values(require("./" + path))[0])
}

const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.POSTGRES_CONN_URI,
    logging: !!process.env.DEBUG,
    logNotifications: !!process.env.DEBUG,
    entities: requireAll(`entities/**`),
    migrations: requireAll(`migrations/**`),
    migrationsRun: true,
    synchronize: false
})

export default dataSource;