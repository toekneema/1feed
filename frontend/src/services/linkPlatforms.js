const YT_API_KEY = "AIzaSyCx9gQHRQQqQnc5oYBcRxEjJ4nqL-vb5R4";
export const linkYouTube = async (channelId) => {
  const alteredChannelId = channelId.slice(0, 1) + "U" + channelId.slice(2);
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${alteredChannelId}&maxResults=5&key=${YT_API_KEY}`
  );
  const data = await response.json();
  const recentVideos = data.items;
  //   console.log(recentVideos);
  return;
};
