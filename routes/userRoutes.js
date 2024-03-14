const express = require('express');
const { registerUser, logInHistory, logOutHistory } = require('../controller/registerCtrl');
const router = express.Router();


router.route("/registerUser").post(registerUser)

router.route("/logIn").post(logInHistory)

router.route("/logOut").post(logOutHistory)

module.exports = router