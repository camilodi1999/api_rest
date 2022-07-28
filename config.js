module.exports = {
    secret: process.env.SECRET || 'secret_key',
    database: process.env.DATABASE || 'sqlite',
    dbname: process.env.DBNAME || 'api-db',
    dbusername: process.env.DBUSER || '',
    dbpassword: process.env.DBPASSWORD || '',
    storage: process.env.STORAGE || './database/database.sqlite',
};