const express = require("express");
const axios = require("axios");
const router = express.Router();
const util = require("./util");

// Constructs a feed for the given user
// (it's really a GET request but it takes in json data (linksMap) so i made it a POST request)
router.post("/", async (req, res) => {
  let allContent = [];
  const linksMap = req.body;

  try {
    for (const [key, value] of Object.entries(linksMap)) {
      for (const id of value) {
        let data = [];
        switch (key) {
          case "YouTube":
            data = await util.getRecentYouTubeVideos(id);
            break;
          // case Instagram:
          //   break;
          // case "Twitter":
          // data = await getTwitterLast7d(id);
          // break;
          default:
            break;
        }
        allContent.push(...data);
      }
    }
    feed = sortAll(allContent);
    res.json({ feed });
  } catch (e) {
    res.send(`Error during getFeed misc-backend: ${e}`);
  }
});

module.exports = router;

// Params: arr of social media posts
// Returns: arr of social media posts, sorted in reverse chronological order
const sortAll = (allContent) => {
  //   allContent.sort()
  return allContent;
};

//   // May need a helper function to sort by datetime field
