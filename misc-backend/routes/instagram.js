const express = require("express");
const router = express.Router();
const util = require("./util");

// Get all media using passed in Instagram username
router.get("/:username", async (req, res) => {
  const username = req.params.username;
  const [recentPosts, isPrivate] = await util.getRecentInstagramPosts(username);
  if (isPrivate) {
    res.send(`Instagram account is private.`);
    console.log("detected private account");
    return;
  }
  recentPosts != null
    ? res.send(recentPosts)
    : res.send(`Error fetching Instagram posts: ${e}`);
});

module.exports = router;
