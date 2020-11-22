var db = require("../db/db.js");
var md5 = require("md5");
var SQL = require("../sql");
var { FIELDS } = require("../constants");

// POST api/login
// body: {
//  email: TEXT,
//  password: TEXT
// }
const login = (req, res) => {
  const params = [req.body[FIELDS.EMAIL], md5(req.body[FIELDS.PASSWORD])];
  db.get(SQL.LOGIN, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: req });
      return;
    }

    if (row === undefined) {
      res.status(404).json();
      return;
    }

    if (row) {
      res.json({
        message: "success",
        code: 200,
        data: row,
      });
    }
  });
};

module.exports = {
  login,
};
