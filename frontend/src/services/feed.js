// Calls the Node.js misc-backend and gets the feed of {username}
export const getFeed = async (username) => {
  let [data, hasError] = [null, false];
  const requestURL = `http://localhost:8080/feed/${username}`;
  try {
    data = await (await fetch(requestURL)).json();
  } catch (e) {
    console.log(`Error fetching feed for "${username}"`, e);
    hasError = true;
  }
  return [data, hasError];
};
