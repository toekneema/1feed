const getTwitter = async (twitterHandle) => {
  const theme = "light";
  let [data, hasError] = [null, false];
  const requestURL = `https://publish.twitter.com/oembed?url=https://twitter.com/${twitterHandle}`;
  try {
    data = await (await fetch(requestURL)).json();
  } catch (e) {
    console.log("Error fetching Twitter data:", e);
    hasError = true;
  }
  return [data, hasError];
};
