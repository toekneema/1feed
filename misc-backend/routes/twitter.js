const express = require("express");
const router = express.Router();

const twitterService = require("../services/twitter.service");

router.get("/twitter", twitterService.getTweets);

module.exports = router;
