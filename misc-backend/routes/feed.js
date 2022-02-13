const express = require("express");
const axios = require("axios");
const router = express.Router();

// Constructs a feed for the given user
router.get("/:username", (req, res) => {
  let [data, hasError] = [null, false];
  const requestURL = `https://publish.twitter.com/oembed?url=https://twitter.com/${req.params.username}&omit_script=1`;
  axios
    .get(requestURL)
    .then((response) => {
      res.send(response.data);
    })
    .catch((e) => {
      hasError = true;
      res.send(`Could not construct a feed for ${req.params.username}. ${e}`);
    });
});

module.exports = router;

// // Iterates through a user's linksMap
// // Makes a GET request to each of them for the last 7d of content
// export const aggregateAll = async (linksMap) => {
//     let allContent = [];
//     for (const [key, value] of Object.entries(linksMap)) {
//       value.forEach((id, idx) => {
//         let [data, hasError] = [null, false];
//         switch (key) {
//           case "YouTube":
//             data = await getYouTubeLast7d(id);
//             break;
//           // case Instagram:
//           //   break;
//           case "Twitter":
//             data = await getTwitterLast7d(id);
//             break;
//           default:
//             break;
//         }
//         allContent.push(data);
//       });
//     }
//     return null;
//   };

//   // Params: arr of social media posts
//   // Returns: arr of social media posts, sorted in reverse chronological order
//   const sortAll = (allContent) => {
//     //   allContent.sort()
//     let allSortedContent = [];
//     return null;
//   };

//   // May need a helper function to sort by datetime field
