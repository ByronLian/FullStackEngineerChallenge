// Set express server
var express = require("express");
var app = express();
var cors = require("cors");

// Import API modules
var userApi = require("./apis/user");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());

// API Server port
var HTTP_PORT = 8888;
app.listen(HTTP_PORT, () => {
  console.log(`Server running on http://localhost:${HTTP_PORT}/`);
  console.log(`Example API: http://localhost:8888/api/users`)
});

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

// API endpoints
// User API
app.get("/api/users", [userApi.getUsers]);
app.post("/api/users", [userApi.addNewUser]);
app.patch("/api/users/:id", [userApi.updateUser]);

// 404
app.use(function (req, res, next) {
  res.status(404).send("404");
});
