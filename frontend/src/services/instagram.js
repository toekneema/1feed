export const getInstagram = async (instagramUsername) => {
  let [data, hasError, isPrivate] = [null, false, false];
  const requestURL = `http://localhost:8080/instagram/${instagramUsername}`;
  try {
    data = await (await fetch(requestURL)).json();
    console.log("what is DATATATATATATA");
    // if (....) {
    //     isPrivate = true;
    // }
  } catch (e) {
    console.log("Error fetching Instagram data:", e);
    hasError = true;
  }
  return [data, hasError, isPrivate];
};
