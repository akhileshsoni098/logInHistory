const express = require('express');
const { adminLogin, adminRegister, getAllUserLogInHistory } = require('../controller/adminRegister');
const { authentication, authorization } = require('../middi/userAuth');
const router = express.Router();

router.route('/registerAdmin').post(adminRegister)

router.route('/logInAdmin').post(adminLogin)
router.route('/getAllUsersHistory').get(authentication,authorization, getAllUserLogInHistory)


module.exports = router