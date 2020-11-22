var db = require("../db/db.js");
var md5 = require("md5");
var SQL = require("../sql");
var { FIELDS } = require("../constants");

// GET api/users
const getUsers = (req, res) => {
  db.all(SQL.GET_USERS, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      code: 200,
      data: rows,
    });
  });
};

// POST api/users
// body: {
//  first_name: TEXT,
//  last_name: TEXT,
//  email: TEXT,
//  password: TEXT
// }
const addNewUser = (req, res) => {
  const errors = [];
  if (!req.body[FIELDS.FIRST_NAME]) {
    errors.push(`No ${[FIELDS.FIRST_NAME]} specified`);
  }
  if (!req.body[FIELDS.LAST_NAME]) {
    errors.push(`No ${[FIELDS.LAST_NAME]} specified`);
  }
  if (!req.body[FIELDS.EMAIL]) {
    errors.push(`No ${[FIELDS.EMAIL]} specified`);
  }
  if (!req.body[FIELDS.PASSWORD]) {
    errors.push(`No ${[FIELDS.PASSWORD]} specified`);
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const data = {
    first_name: req.body[FIELDS.FIRST_NAME],
    last_name: req.body[FIELDS.LAST_NAME],
    email: req.body[FIELDS.EMAIL],
    password: md5(req.body[FIELDS.PASSWORD]),
  };

  const params = [data.first_name, data.last_name, data.email, data.password];
  db.run(SQL.ADD_NEW_USER, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      code: 200,
      data: data,
      id: this.lastID,
    });
  });
};

// PATCH api/users/:id
// body: {
//  first_name: TEXT,
//  last_name: TEXT
//  password: TEXT,
//  active: INTEGER
// }
//
// params:
// id (INTEGER)
const updateUser = (req, res) => {
  const data = {
    first_name: req.body[FIELDS.FIRST_NAME] ? req.body[FIELDS.FIRST_NAME] : null,
    last_name: req.body[FIELDS.LAST_NAME] ? req.body[FIELDS.LAST_NAME] : null,
    password: req.body[FIELDS.PASSWORD] ? md5(req.body[FIELDS.PASSWORD]) : null,
    active: req.body[FIELDS.ACTIVE],
  };
  db.run(
    SQL.UPDATE_USER,
    [data.first_name, data.last_name, data.password, data.active, req.params.id],
    function (err) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        code: 200,
        changes: this.changes,
      });
    }
  );
};

module.exports = {
  getUsers,
  addNewUser,
  updateUser,
};
