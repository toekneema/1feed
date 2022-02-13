export const getFormattedTwitterUsernameIfExists = async (twitterUsername) => {
  const theme = "light";
  let [data, hasError] = [null, false];
  const requestURL = `http://localhost:8080/twitter/${twitterUsername}`;
  try {
    data = await (await fetch(requestURL)).json();
  } catch (e) {
    console.log("Error fetching Twitter data:", e);
    hasError = true;
  }
  return [data, hasError];
};
