const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const { encryptPass, checkPassword } = require('../util/helperFunctions');

const Hirer = sequelize.define('hirer', {
    id : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName : {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName : {
        type: Sequelize.STRING
    },
    email : {
        type: Sequelize.STRING,
        allowNull: false
    },
    password : {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Hirer.beforeValidate(encryptPass);

Hirer.prototype.checkPassword = checkPassword;

module.exports = Hirer;