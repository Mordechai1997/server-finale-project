const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require("bcrypt-nodejs");

const Like = sequelize.define('likes', {
    likeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false

    }
})


module.exports = Like;