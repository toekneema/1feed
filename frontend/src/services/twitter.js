export const getTwitter = async (twitterUsername) => {
  const theme = "light";
  let [data, hasError] = [null, false];
  const requestURL = `https://publish.twitter.com/oembed?url=https://twitter.com/${twitterUsername}`;
  // const requestURL = `http://localhost:1337/api/twitter/${twitterUsername}`
  try {
    data = await (
      await fetch(requestURL, {
        method: "GET",
        mode: "cors",
      })
    ).json();
  } catch (e) {
    console.log("Error fetching Twitter data:", e);
    hasError = true;
  }
  return [data, hasError];
};
