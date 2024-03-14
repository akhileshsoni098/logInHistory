const express = require('express');
const adminRouting = express()



const adminRoute = require("../routes/adminRoutes")

adminRouting.use("/admin", adminRoute)


module.exports = adminRouting;