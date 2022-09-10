const { Client } = require('pg');
const user = 'postgres';
const password = 'postgres';
const dbUrl = `postgresql://${user}:${password}@localhost:5432/deploy_heroku`;
let db = null;
exports.connect = async () => {
    if (db == null) {
        db = new Client({
            connectionString: process?.env?.DATABASE_URL || dbUrl,
            ...(process?.env?.DATABASE_URL ? {ssl: { rejectUnauthorized: false }} : {})
        });
        await db.connect();
        await db.query(`
            CREATE TABLE IF NOT EXISTS users(
                id BIGSERIAL NOT NULL PRIMARY KEY,
                first_name VARCHAR(256),
                last_name VARCHAR(356),
                created_at timestamp not null default CURRENT_TIMESTAMP
            );
        `);
        return db;
    }
    return db;
};
exports.insertOne = async (table, entity) => {
    if (db == null) {
        throw Error('Cannot connect to db, try connecting first failed');
    }
    const query = `
        INSERT INTO ${table} (
            ${Object.keys(entity).join(',')}
        )
        values (${Object.values(entity).map(v => `'${v}'`).join(',')})
    `;
    const res = await db.query(query);
    return res;
};
exports.getAll = async (table) => {
    if (db == null) {
        throw Error('Cannot connect to db, try connecting first failed');
    }
    const res = await db.query(`
        SELECT * FROM ${table}
    `);
    return res?.rows;
};
