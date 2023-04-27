const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require("bcrypt-nodejs");

const UserNotification = sequelize.define('userNotification', {
    userNotificationId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userIdLikeIt: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    typeNotification: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

})

module.exports = UserNotification;