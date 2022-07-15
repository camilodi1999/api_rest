const { Sequelize } = require("sequelize");
const config = require("./config")


// I use an ORM due to it can change the type of database
// easily like for instance postgres for production
const sequelize = new Sequelize(config.dbname, "", "", {
    dialect: config.database,
    storage: config.storage
});

sequelize.authenticate().then(() => {

});

module.exports = sequelize;