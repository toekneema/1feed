const express = require("express");
const router = express.Router();

// Get all tweets using passed in Twitter username
router.get("/:id", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
