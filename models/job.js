const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Job = sequelize.define('job', {
    id : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    positionAvailable : {
        type: Sequelize.STRING,
        allowNull: false
    },
    salary : {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    location : {
        type: Sequelize.STRING,
        allowNull: false
    },
    aboutTheRole : {
        type: Sequelize.TEXT,
        allowNull: false
    },
    candidateDetails : {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Job;