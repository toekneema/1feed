const express = require("express");

module.exports = {
  getTweets: (req, res) => {
    const fakeTweets = {
      tweet1: "I am lebron!",
    };

    return res.status(200).json({ fakeTweets: fakeTweets });
  },
};
