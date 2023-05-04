const userRepo = require('../repositories/userRepo');
const productRepo = require('../repositories/productRepo');
const jwt = require('jsonwebtoken');


const updateUserDetails = async (id, email, name, phoneNumber) => {
    try {
        const userNew = await userRepo.updateUserDetails(id, email, name, phoneNumber);
        return userNew;
    }
    catch (err) {
        throw err;
    }
}
const getAllUserNotifications = async (id) => {
    try {
        const notifications = await productRepo.getAllUserNotifications(id);
        return notifications;
    }
    catch (err) {
        throw err;
    }
}
const getUserIdByToken = async (token) => {
    try {
        const isVarify = jwt.verify(token, process.env.PASSWORD_EMAIL);
        return isVarify.userId;
    }
    catch (err) {
        throw err;
    }
}
module.exports = userService = {
    updateUserDetails,
    getAllUserNotifications,
    getUserIdByToken
}

