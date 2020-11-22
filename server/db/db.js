var schema = require("./schema");
var sqlite3 = require("sqlite3").verbose();
var {
  userTestingData,
  reviewMainTestingData,
  reviewsTestingData,
} = require("./testingData");

const DB = "db.sqlite";

const createTableAndTestingData = () => {
  db.run(schema.CREATE_USERS_TABLE, (error) => {
    if (!error) {
      userTestingData(db);
      db.run(schema.CREATE_REVIEW_MAIN_TABLE, (error) => {
        if (!error) {
          reviewMainTestingData(db);
        }
      });
      db.run(schema.CREATE_REVIEWS_TABLE, (error) => {
        if (!error) {
          reviewsTestingData(db);
        }
      });
    }
  });
};

let db = new sqlite3.Database(DB, (error) => {
  if (error) {
    // Can't open database
    console.error(error.message);
    throw error;
  } else {
    console.log("Opened and Connected to the SQLite database.");
    // Creating Table and some testing data, only run at first time
    createTableAndTestingData();
  }
});

module.exports = db;
