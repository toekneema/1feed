const express = require("express");
const axios = require("axios");
const router = express.Router();

// Get all tweets using passed in Twitter username
router.get("/:username", (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

const constructTikTokData = (items) => {
  let urls = [];
  items.forEach((item) => {
    urls.push({});
  });
};

module.exports = router;
