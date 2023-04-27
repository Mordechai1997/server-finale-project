const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const TypeNotification = sequelize.define('TypeNotification', {
    typeNotificationyId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    notificationName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notificationDescription: {
        type: DataTypes.STRING,
        allowNull: true
    },
})
TypeNotification.sync().then(() => {
    TypeNotification.create({
        notificationName: 'Like alert'
    });
    TypeNotification.create({
        notificationName: 'View alert'
    });
    TypeNotification.create({
        notificationName: 'Deletion alert'
    });
  });

// User.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

module.exports = TypeNotification;