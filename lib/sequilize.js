const { Sequelize } = require("sequelize");
const config = require("../config")


const database = config.dbname;
const username = config.dbusername;
const password = config.dbpassword;
const dialect = config.database;
const storage = config.storage;

// I use an ORM due to it can change the type of database
// easily like for instance postgres for production
const sequelize = new Sequelize({database, 
    username, 
    password, 
    dialect,
    storage
});



module.exports = sequelize;