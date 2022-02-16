const express = require("express");
const axios = require("axios");
const router = express.Router();

const YT_API_KEY = "AIzaSyCx9gQHRQQqQnc5oYBcRxEjJ4nqL-vb5R4";

// Get last 5 YouTube videoId and publishedAt dates using passed in channel ID
router.get("/:id", (req, res) => {
  const channelId = req.params.id;
  const alteredChannelId = channelId.slice(0, 1) + "U" + channelId.slice(2);
  const requestURL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${alteredChannelId}&maxResults=5&key=${YT_API_KEY}`;
  axios
    .get(requestURL)
    .then((response) => {
      res.send(extractIdsAndDate(response.data.items));
    })
    .catch((e) => {
      res.send(`Error fetching YouTube videos: ${e}`);
    });
});

// Takes in an array of video items, and extracts the videoId and the publishedAt fields
const extractIdsAndDate = (items) => {
  let urls = [];
  items.forEach((item) => {
    urls.push({
      timestamp: item.snippet.publishedAt,
      payload: { type: "YouTube", id: item.snippet.resourceId.videoId },
    });
  });
  console.log(urls);
  return urls;
};

module.exports = router;
