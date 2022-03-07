const express = require("express");
const router = express.Router();
const util = require("./util");

// Get all media using passed in Instagram username
router.get("/:username", async (req, res) => {
  const username = req.params.username;
  const recentPosts = await util.getRecentInstagramPosts(username);
  recentPosts != null
    ? res.send(recentPosts)
    : res.send(`Error fetching Instagram posts: ${e}`);
});

module.exports = router;
