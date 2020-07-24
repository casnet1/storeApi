const express = require("express");
var app = express();

app.use(require("./users"));
app.use(require("./products"));


module.exports = app;