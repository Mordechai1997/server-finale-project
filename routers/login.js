const express = require('express');
const router = express.Router();
const controllerSignin = require('../controllers/login')

router.post('/login', controllerSignin.signin)
router.post('/signup', controllerSignin.signup)
router.get('/reset-password-email', controllerSignin.resetPasswordEmail)
router.post('/update-password', controllerSignin.updatePassword)
router.get('/getEmailUserByMemberId',controllerSignin.isAuthControllers ,controllerSignin.getEmailUserByMemberId)
router.post('/updateUserDetails',controllerSignin.isAuthControllers ,controllerSignin.updateUserDetails)
router.get('/auth', controllerSignin.isAuth);
router.get('/getAllUserNotifications',controllerSignin.isAuthControllers ,controllerSignin.getAllUserNotifications)






module.exports = router;