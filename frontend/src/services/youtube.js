export const getYouTube = async (channelId) => {
  let [data, hasError] = [null, false];
  try {
    const requestURL = `http://localhost:8080/youtube/${channelId}`;
    data = await (await fetch(requestURL)).json();
  } catch (e) {
    console.log("Error fetching YouTube videos:", e);
    hasError = true;
  }
  return [data, hasError];
};
