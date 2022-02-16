const express = require("express");
const axios = require("axios");
const router = express.Router();

// Get all tweets using passed in Twitter username
router.get("/:username", (req, res) => {
  const requestURL = `https://publish.twitter.com/oembed?url=https://twitter.com/${req.params.username}&omit_script=1`;
  axios
    .get(requestURL)
    .then((response) => {
      res.send(response.data);
    })
    .catch((e) => {
      res.send(`Error fetching Twitter data: ${e}`);
    });
});

module.exports = router;
