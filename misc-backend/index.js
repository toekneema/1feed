const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Currently allows any domain to have access to this misc-backend.
const cors = require("cors");
app.use(cors());

// Middleware for YouTube related requests
const youtube = require("./routes/youtube");
app.use("/youtube", youtube);
// Middleware for Twitter related requests
const twitter = require("./routes/twitter");
app.use("/twitter", twitter);
// Middleware for TikTok related requests
const tiktok = require("./routes/tiktok");
app.use("/tiktok", tiktok);
// Middleware for constructing a feed for the public profile
const feed = require("./routes/feed");
app.use("/feed", feed);

module.exports = app;
