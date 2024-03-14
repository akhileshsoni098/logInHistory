const express = require('express');
const userRouting = express()



const userRoute = require("../routes/userRoutes")

userRouting.use("/user", userRoute)

module.exports = userRouting;