// Set express server
var express = require("express");
var app = express();
var cors = require("cors");

// Import API modules
var userApi = require("./apis/user");
var reviewApi = require("./apis/review");
var loginApi = require("./apis/login");
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
// Review APIs
app.get("/api/reviews/:id", [reviewApi.getReviewsByUser]);
app.patch("/api/reviews/:id", [reviewApi.updateReviewByUser]);
app.get("/api/review-periods/", [reviewApi.getAllPerformancePeriods]);
app.post("/api/review-periods/", [reviewApi.addNewPerformancePeriod]);
app.patch("/api/review-periods/:id", [reviewApi.updatePerformancePeriod]);
app.get("/api/all-reviews/:id", [reviewApi.getReviewsByPeriodId]);
// Login APIs
app.post("/api/login", [loginApi.login]);

// 404
app.use(function (req, res, next) {
  res.status(404).send("404");
});
