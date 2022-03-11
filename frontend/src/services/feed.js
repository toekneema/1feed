// Calls the Node.js misc-backend /feed endpoint which aggregates the AUTO + individual feeds for {username}
export const getFeed = async (linksMap) => {
  let data = null;
  const requestURL = `http://localhost:8080/feed`;
  try {
    // AUTO feed fetch
    const dataJson = await (
      await fetch(requestURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(linksMap),
      })
    ).json();
    data = dataJson.feed;
  } catch (e) {
    console.log(`Error fetching feed:`, e);
  }
  console.log("what is data", data);
  return data;
};

// just for testing purposes
const fakeFeedData = [
  {
    type: "Instagram",
    timestamp: new Date(2022, 11, 24, 10, 33, 30, 0),
    payload: "https://www.instagram.com/p/CaPk1xtlS1u/",
  },
  {
    type: "YouTube",
    timestamp: new Date(2022, 2, 24, 10, 33, 30, 0),
    payload: "https://www.youtube.com/watch?v=DwcM_oIzryo",
  },
  {
    type: "Twitter",
    timestamp: new Date(2022, 2, 24, 10, 33, 30, 0),
    payload: "https://twitter.com/StephenCurry30/status/1494378407173492741",
  },
  {
    type: "Twitter",
    timestamp: new Date(2022, 2, 24, 10, 33, 30, 0),
    payload: "https://twitter.com/StephenCurry30/status/1494134685672173568",
  },
  {
    type: "LinkedIn",
    timestamp: new Date(2022, 11, 24, 10, 33, 30, 0),
    payload:
      "https://www.linkedin.com/posts/stephencurry30_blackwomenimpact-activity-6823395742749732864-MO17",
  },

  {
    type: "Facebook",
    timestamp: new Date(2022, 11, 24, 10, 33, 30, 0),
    payload:
      "https://www.facebook.com/StephenCurryOfficial/posts/505173140972885",
  },
  {
    type: "YouTube",
    timestamp: new Date(2022, 2, 24, 10, 33, 30, 0),
    payload: "https://www.youtube.com/watch?v=Voa5JZHpiRM",
  },
  {
    type: "Twitter",
    timestamp: new Date(2022, 2, 24, 10, 33, 30, 0),
    payload: "https://twitter.com/StephenCurry30/status/1494720682340536325",
  },
  {
    type: "YouTube",
    timestamp: new Date(2022, 2, 24, 10, 33, 30, 0),
    payload: "https://www.youtube.com/watch?v=l5aoCte13ps",
  },
  {
    type: "Twitter",
    timestamp: new Date(2022, 11, 24, 10, 33, 30, 0),
    payload: "https://twitter.com/StephenCurry30/status/1491114874529005570",
  },
  {
    type: "Facebook",
    timestamp: new Date(2022, 11, 24, 10, 33, 30, 0),
    payload:
      "https://www.facebook.com/StephenCurryOfficial/posts/489567855866747",
  },
];
// just for testing purposes
export const getFakeFeedData = async (startIdx = 0, endIdx = 5) => {
  const wait = (timeToDelay) =>
    new Promise((resolve) => setTimeout(resolve, timeToDelay));
  await wait(1500);
  return fakeFeedData.slice(startIdx, endIdx);
};
