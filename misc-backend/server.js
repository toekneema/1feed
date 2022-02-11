const express = require("express");
const app = require("./index");

app.use(express.json());

const twitterRouter = require("./routes/twitter");
app.use("/twitter", twitterRouter);

app.listen(8080, (err) => {
  if (err) throw err;
  console.log("Node.js server running at http://127.0.0.1:8080");
});
