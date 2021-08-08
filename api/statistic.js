const db = require("../db");
const express = require("express");
const router = express.Router();

router.use(express.json());

router.post("/users", (req, res) => {
  const { page, limit } = req.body;

  db.statistic.getUsersStatistic(page, limit, (err, statistic) => {
    if (err) {
      res.send("Error");
    } else {
      res.send(statistic);
    }
  });
});

router.post("/user/:id", (req, res) => {
  const { id } = req.params;
  const { dateFrom, dateTo } = req.body;

  if (!dateFrom || !dateTo) return;

  db.statistic.getUserStatistic(id, dateFrom, dateTo, (err, statistic) => {
    if (err) {
      res.send("Error");
    } else {
      res.send(statistic);
    }
  });
});

module.exports = router;
