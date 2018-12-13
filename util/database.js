const Sequelize = require('sequelize');
const { DB } = require('./config');

// Setting up database connection
const sequelize = new Sequelize(DB.DB_NAME, DB.USER, DB.PASSWORD, {
    dialect: 'mysql',
    host: DB.HOST,
    port: DB.PORT,
    operatorsAliases: false
});

module.exports = sequelize;