module.exports = {
    database: process.env.DATABASE || 'sqlite',
    dbname: process.env.DBNAME || 'api-db',
    storage: process.env.STORAGE || './database/database.sqlite',
};