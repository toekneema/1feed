const express = require("express");
const app = require("./index");
const youtubeRouter = require("./routes/youtube");
const twitterRouter = require("./routes/twitter");
const tiktokRouter = require("./routes/tiktok");
const feedRouter = require("./routes/feed");

app.use(express.json());
app.use("/youtube", youtubeRouter);
app.use("/twitter", twitterRouter);
app.use("/tiktok", tiktokRouter);
app.use("/feed", feedRouter);

app.listen(8080, (err) => {
  if (err) throw err;
  console.log("Node.js server running at http://127.0.0.1:8080");
});
