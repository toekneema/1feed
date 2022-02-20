// Calls the Node.js misc-backend and gets the feed for {username}
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

// just for testing purposes
const fakeFeedData = [
  {
    type: "TikTok",
    timestamp: new Date(2022, 11, 24, 10, 33, 30, 0),
    payload:
      "https://www.tiktok.com/@espn/video/7066576957256944943?is_copy_url=1",
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
  return fakeFeedData.slice(startIdx, endIdx);
};
