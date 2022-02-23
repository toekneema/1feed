const express = require("express");
const axios = require("axios");
const router = express.Router();

// Get all tweets using passed in Twitter username
router.get("/:username", (req, res) => {
  // try {
  // } catch (error) {
  //   console.log(error);
  // }
});

const constructTikTokData = (username, items) => {
  let urls = [];
  const urlPrefix = `https://www.tiktok.com/@${username}/video/`;
  items.forEach((item) => {
    urls.push({
      type: "TikTok",
      timestamp: new Date(),
      payload: urlPrefix + item,
    });
  });
};

module.exports = router;
