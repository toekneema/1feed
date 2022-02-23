const express = require("express");
const router = express.Router();
const util = require("./util");

// Get last 5 YouTube videoId and publishedAt dates using passed in channel ID
router.get("/:id", async (req, res) => {
  const channelId = req.params.id;
  const recentVids = await util.getRecentYouTubeVideos(channelId);
  recentVids != null
    ? res.send(recentVids)
    : res.send(`Error fetching YouTube videos: ${e}`);
});

module.exports = router;
