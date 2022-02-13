const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require("cors");
app.use(cors());

const twitter = require("./routes/twitter");
app.use("/twitter", twitter);

module.exports = app;
