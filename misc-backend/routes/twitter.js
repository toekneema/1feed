const express = require("express");
const axios = require("axios");
const router = express.Router();

// Get all tweets using passed in Twitter username
router.get("/:id", (req, res) => {
  let [data, hasError] = [null, false];
  const requestURL = `https://publish.twitter.com/oembed?url=https://twitter.com/${req.params.id}`;
  axios
    .get(requestURL)
    .then((response) => {
      res.send(response.data.html);
    })
    .catch((e) => {
      hasError = true;
      res.send(`Error fetching Twitter data: ${e}`);
    });
});

module.exports = router;
