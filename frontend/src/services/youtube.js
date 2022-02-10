const YT_API_KEY = "AIzaSyCx9gQHRQQqQnc5oYBcRxEjJ4nqL-vb5R4";
export const getYouTube = async (channelId) => {
  try {
    const alteredChannelId = channelId.slice(0, 1) + "U" + channelId.slice(2);
    const requestURL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${alteredChannelId}&maxResults=5&key=${YT_API_KEY}`;
    const response = await fetch(requestURL);
    if (!response.ok) {
      throw "Failed to fetch url (either API KEY is bad, or probably channelId is wrong)";
    }
    const data = await response.json();
    const recentVideos = data.items;
    //   console.log(recentVideos);
    return "success";
  } catch (e) {
    return "failure";
  }
};
