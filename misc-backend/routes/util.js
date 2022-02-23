const axios = require("axios");

const YT_API_KEY = "AIzaSyCx9gQHRQQqQnc5oYBcRxEjJ4nqL-vb5R4";

const getRecentYouTubeVideos = async (channelId) => {
  const alteredChannelId = channelId.slice(0, 1) + "U" + channelId.slice(2);
  const requestURL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${alteredChannelId}&maxResults=5&key=${YT_API_KEY}`;
  const recentVidsRaw = (await axios.get(requestURL)).data.items;
  const recentVids = extractIdsAndDate(recentVidsRaw);
  return recentVids;
};

// [Helper method] Takes in an array of video items, and extracts the videoId and the publishedAt fields
const extractIdsAndDate = (items) => {
  let urls = [];
  items.forEach((item) => {
    urls.push({
      type: "YouTube",
      timestamp: item.snippet.publishedAt,
      payload: item.snippet.resourceId.videoId,
    });
  });
  return urls;
};

module.exports = { getRecentYouTubeVideos };
