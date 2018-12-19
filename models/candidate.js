const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const { encryptPass, checkPassword } = require('../util/helperFunctions');

const Candidate = sequelize.define('candidate', {
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
    },
    github : {
        type: Sequelize.STRING
    },
    stackOverflow : {
        type: Sequelize.STRING
    },
    dribbble : {
        type: Sequelize.STRING
    },
    twitter : {
        type: Sequelize.STRING
    },
    shortIntro : {
        type: Sequelize.TEXT
    },
    longIntro : {
        type: Sequelize.TEXT
    }
});

Candidate.beforeCreate(encryptPass);
Candidate.beforeUpdate(encryptPass);

Candidate.prototype.checkPassword = checkPassword;

module.exports = Candidate;