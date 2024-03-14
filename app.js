

const express = require("express");
const app = express();

app.use(express.json());

// routes will be here

//admin
const admin = require("./routing/admin.js")

// user 
const user = require("./routing/user.js")
//test

const test = require("./routes/testRoute.js");

app.use("/",admin)

//////////////////////////////
app.use("/", user)

//////////////////////////////
app.use("/", test);

module.exports = app;
