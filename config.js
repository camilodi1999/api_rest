// configuration of the environment variables

module.exports = {
    secret: process.env.SECRET || 'secret_key',
    database: process.env.DIALECT || 'sqlite',
    dbname: process.env.DB_NAME || 'api-db',
    dbusername: process.env.DB_USER || '',
    dbpassword: process.env.DB_PASSWORD || '',
    storage: process.env.DB_HOST || './database.sqlite',
    googlemapskey: process.env.GOOGLE_MAPS_API_KEY || '',
    textsearchurl: process.env.TEXT_SEARCH_URL || '',
};