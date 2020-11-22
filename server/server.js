// Set express server
var express = require("express");
var app = express();

// API Server port
var HTTP_PORT = 8888;
app.listen(HTTP_PORT, () => {
  console.log(`Server running on http://localhost:${HTTP_PORT}/`);
});

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

// 404
app.use(function (req, res, next) {
  res.status(404).send("404");
});
