const userRepo = require('../repositories/userRepo');
const productRepo = require('../repositories/productRepo');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL
    }
});

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
const ContactUsEmail = (message, email, item = null) => {
    var subject = 'Contact from the website'
    var messageFromuser = message + "<br/> email : " + email
    if (item) {
        subject = 'Report product from the website'
        messageFromuser = message + "<br/> email : " + email + "<br/> product: " + item;
    }

    var mailOptions = {
        from: process.env.USER_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: subject,
        html: messageFromuser

    };

    transporter.sendMail(mailOptions, function (error, info) {
        console.log(error, info)
        if (error) {
            throw new Error('Something goes to wrong. Please try again')

        }
    });
}
module.exports = userService = {
    updateUserDetails,
    getAllUserNotifications,
    getUserIdByToken,
    ContactUsEmail
}

