// configuration of the environment variables

module.exports = {
    secret: process.env.SECRET || 'secret_key',
    database: process.env.DATABASE || 'sqlite',
    dbname: process.env.DBNAME || 'api-db',
    dbusername: process.env.DBUSER || '',
    dbpassword: process.env.DBPASSWORD || '',
    storage: process.env.STORAGE || './database/database.sqlite',
    googlemapskey: process.env.GOOGLE_MAPS_API_KEY || '',
    textsearchurl: process.env.TEXT_SEARCH_URL || '',
    nearbyseachurl: process.env.NEARBY_SEACH_URL || ''
};