module.exports = (db) => {
  /**
   * Counts total views and total clicks for every user.
   * @param {integer} Active page.
   * @param {integer} Limit of rows on one page.
   * @param {function} Callback function.
   */
  const getUsersStatistic = (page, limit, cb) => {
    db.all(
      `SELECT users.user_id, users.first_name, users.last_name, users.email, users.gender, users.ip_address, SUM(users_statistic.clicks) AS total_clicks, SUM(users_statistic.page_views) AS total_views FROM users_statistic INNER JOIN users ON users.user_id = users_statistic.user_id GROUP BY users.user_id LIMIT ${
        (page - 1) * limit
      }, ${limit}`,
      (err, rows) => {
        if (err) {
          console.error(err);
        }

        cb(err, rows);
      }
    );
  };

  /**
   * Returns statistic for user.
   * @param {integer} Id of the user.
   * @param {integer} Unix timestamp - date from.
   * @param {integer} Unix timestamp - date to.
   * @param {function} Callback function.
   */
  const getUserStatistic = (userID, dateFrom, dateTo, cb) => {
    db.all(
      `SELECT users.user_id, users.first_name, users.last_name, users_statistic.month, users_statistic.year, SUM(users_statistic.clicks) AS total_clicks, SUM(users_statistic.page_views) AS total_views FROM users_statistic INNER JOIN users ON users.user_id = users_statistic.user_id WHERE (users_statistic.user_id = ${userID}) AND (${dateFrom} < date AND ${dateTo} > date) GROUP BY users_statistic.month, users_statistic.year`,
      (err, rows) => {
        if (err) {
          console.error(err);
        }

        cb(err, rows);
      }
    );
  };

  return { getUsersStatistic, getUserStatistic };
};
