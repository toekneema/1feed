const axios = require("axios");
const bigInt = require("big-integer");

const YT_API_KEY = "AIzaSyCx9gQHRQQqQnc5oYBcRxEjJ4nqL-vb5R4";

const getRecentYouTubeVideos = async (channelId) => {
  const alteredChannelId = channelId.slice(0, 1) + "U" + channelId.slice(2);
  const requestURL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${alteredChannelId}&maxResults=5&key=${YT_API_KEY}`;
  const recentVidsRaw = (await axios.get(requestURL)).data.items;
  const recentVids = extractIdsAndDate(recentVidsRaw);
  return recentVids;
};

// [YouTube Helper method] Takes in an array of video items, and extracts the videoId and the publishedAt fields
const extractIdsAndDate = (items) => {
  let urls = [];
  const urlPrefix = "https://www.youtube.com/watch?v=";
  items.forEach((item) => {
    urls.push({
      type: "YouTube",
      timestamp: item.snippet.publishedAt,
      payload: urlPrefix + item.snippet.resourceId.videoId,
    });
  });
  return urls;
};

const getRecentInstagramPosts = async (username) => {
  const requestURL = `https://www.instagram.com/${username}/channel/?__a=1`;
  // const data = (await axios.get(requestURL)).data.graphql.user;
  const data = (await axios.get(requestURL)).data;
  const edges = data.edge_owner_to_timeline_media.edges;
  const isPrivate = data.is_private;
  let urls = [];
  for (const edge of edges) {
    urls.push({
      type: "Instagram",
      timestamp: new Date(),
      payload: "https://www.instagram.com/p/" + edge.node.shortcode,
    });
  }
  return [urls, isPrivate];
};

module.exports = { getRecentYouTubeVideos, getRecentInstagramPosts };
