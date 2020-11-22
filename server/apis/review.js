var db = require("../db/db.js");
var SQL = require("../sql");
var { FIELDS } = require("../constants");

// GET api/reviews/:id
// params:
// id (INTEGER)
const getReviewsByUser = (req, res) => {
  db.all(SQL.GET_REVIEWS_BY_USER_ID, [req.params[FIELDS.ID]], (err, rows) => {
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

// PATCH api/reviews/:id
// body: {
//  content: TEXT,
//  auditor_id: INTEGER,
//  updated_time: TEXT,
// }
//
// params:
// id (INTEGER)
const updateReviewByUser = (req, res) => {
  const date = new Date();
  const time =
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/" +
    date.getHours() +
    ":" +
    date.getMinutes();
  const data = {
    content: req.body[FIELDS.CONTENT] ? req.body[FIELDS.CONTENT] : null,
    auditor_id: req.body[FIELDS.AUDITOR_ID]
      ? req.body[FIELDS.AUDITOR_ID]
      : null,
    updated_time: time,
  };
  const params = [
    data[FIELDS.CONTENT],
    data[FIELDS.AUDITOR_ID],
    data[FIELDS.UPDATED_TIME],
    req.params[FIELDS.ID],
  ];
  db.run(SQL.UPDATE_REVIEW_BY_USER_ID, params, function (err) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({
      message: "success",
      code: 200,
      changes: this.changes,
    });
  });
};

// GET api/review-periods
const getAllPerformancePeriods = (req, res) => {
  db.all(SQL.GET_ALL_PERFORMANCE_PERIODS, [], (err, rows) => {
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

// GET api/all-reviews/:id
// params:
// id (INTEGER)
const getReviewsByPeriodId = (req, res) => {
  const params = [req.params[FIELDS.ID] === "0" ? null : req.params[FIELDS.ID]];
  db.all(SQL.GET_REVIEWS_BY_PERIOD_ID, params, (err, rows) => {
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

// POST api/review-periods
// body: {
//  title: TEXT,
//  start: TEXT,
//  end: TEXT
// }
const addNewPerformancePeriod = (req, res) => {
  const errors = [];
  if (!req.body[FIELDS.TITLE]) {
    errors.push(`No ${[FIELDS.TITLE]} specified`);
  }
  if (!req.body[FIELDS.START]) {
    errors.push(`No ${[FIELDS.START]} specified`);
  }
  if (!req.body[FIELDS.END]) {
    errors.push(`No ${[FIELDS.END]} specified`);
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const params = [
    req.body[FIELDS.TITLE],
    req.body[FIELDS.START],
    req.body[FIELDS.END],
  ];
  db.run(SQL.ADD_NEW_PERFORMANCE_PERIOD, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!err) {
      db.run(SQL.ADD_REVIEWS_FOR_NEW_PERIOD, [this.lastID]);
    }
    res.json({
      message: "success",
      code: 200,
      id: this.lastID,
    });
  });
};

// PATCH api/review-periods/:id
// body: {
//  title: TEXT,
//  start: TEXT,
//  end: TEXT,
//  is_closed: INTEGER
// }
//
// params:
// id (INTEGER)
const updatePerformancePeriod = (req, res) => {
  const data = {
    title: req.body[FIELDS.TITLE] ? req.body[FIELDS.TITLE] : null,
    start: req.body[FIELDS.START] ? req.body[FIELDS.START] : null,
    end: req.body[FIELDS.END] ? req.body[FIELDS.END] : null,
    is_closed: req.body[FIELDS.IS_CLOSED],
  };

  db.run(
    SQL.UPDATE_PERFORMANCE_PERIOD,
    [data.title, data.start, data.end, data.is_closed, req.params.id],
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
  getReviewsByUser,
  updateReviewByUser,
  getAllPerformancePeriods,
  getReviewsByPeriodId,
  addNewPerformancePeriod,
  updatePerformancePeriod,
};
