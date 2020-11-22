var md5 = require("md5");

// User testing data
const userTestingData = (db) => {
  var insert =
    "INSERT INTO USERS (first_name, last_name, email, password, role) VALUES (?,?,?,?,?)";
  db.run(insert, ["Admin", "User", "admin@test.com", md5("3#3r2fE"), "admin"]);
  db.run(insert, ["User", "A", "user1@test.com", md5("wefD1@3*"), "user"]);
  db.run(insert, ["User", "B", "user2@test.com", md5("#21Fssc"), "user"]);
  db.run(insert, ["User", "C", "user3@test.com", md5("21FsSc@"), "user"]);
  db.run(insert, ["User", "D", "user4@test.com", md5("21FssC*"), "user"]);
};

// Review period testing data
const reviewMainTestingData = (db) => {
  var insert =
    "INSERT INTO REVIEW_MAIN (title, start, end, is_closed) VALUES (?,?,?,?)";
  db.run(insert, ["2019 2H", "2019-01-01", "2020-01-31", 1]);
  db.run(insert, ["2020 1H", "2020-07-01", "2020-08-31", 0]);
  db.run(insert, ["2020 2H", "2021-01-01", "2021-01-31", 0]);
};

// Reviews testing data
const reviewsTestingData = (db) => {
  var insert =
    "INSERT INTO REVIEWS (review_id, auditor_id, candidate_id) VALUES (?,?,?)";
  db.run(insert, [1, 1, 2]);
  db.run(insert, [1, null, 3]);
  db.run(insert, [1, null, 4]);
  db.run(insert, [1, 2, 1]);
  db.run(insert, [1, 3, 5]);
  db.run(insert, [2, 1, 2]);
  db.run(insert, [2, null, 3]);
  db.run(insert, [2, null, 4]);
  db.run(insert, [2, 2, 1]);
  db.run(insert, [2, 3, 5]);
  db.run(insert, [3, 1, 2]);
  db.run(insert, [3, 4, 3]);
  db.run(insert, [3, 3, 4]);
  db.run(insert, [3, 5, 1]);
  db.run(insert, [3, 2, 5]);
};

module.exports = {
  userTestingData,
  reviewMainTestingData,
  reviewsTestingData,
};
