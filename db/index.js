const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

/*
 * Connect to the database.
 */
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log('Connected to the in-memory SQlite database.');
});

db.serialize(() => {
  /*
   * Create tables if they don't exist.
   */
  db.run('CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT UNIQUE, gender TEXT, ip_address TEXT UNIQUE)');
  db.run('CREATE TABLE IF NOT EXISTS users_statistic (user_id INTEGER NOT NULL, date INTEGER NOT NULL, month INTEGER NOT NULL, year INTEGER NOT NULL, page_views INTEGER NOT NULL, clicks INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES users (user_id) ON UPDATE RESTRICT ON DELETE RESTRICT)');

  /*
   * Read and parse users.json, users_statistics.json.
   */
  let rawdata = fs.readFileSync('users.json');
  const users = JSON.parse(rawdata); 

  rawdata = fs.readFileSync('users_statistic.json');
  const statistic = JSON.parse(rawdata);

  /*
   * Initialize users table with data.
   */
  const usersStmt = db.prepare('INSERT INTO users (user_id, first_name, last_name, email, gender, ip_address) VALUES (?, ?, ?, ?, ?, ?)');
  for (let i = 0; i < users.length; i++) {
    usersStmt.run(users[i].id, users[i].first_name, users[i].last_name, users[i].email, users[i].gender, users[i].ip_address);
  }
  usersStmt.finalize();

  /*
   * Initialize users_statistic with data.
   */
  let date;
  const statisticStmt = db.prepare('INSERT INTO users_statistic (user_id, date, month, year, page_views, clicks) VALUES (?, ?, ?, ?, ?, ?)');
  for (let i = 0; i < statistic.length; i++) {
    date = new Date(statistic[i].date);
    statisticStmt.run(statistic[i].user_id, date.getTime() / 1000, date.getMonth(), date.getFullYear(), statistic[i].page_views, statistic[i].clicks);
  }
  statisticStmt.finalize();
});

exports.statistic = require('./users_statistic')(db);

/*
 * Close database connection on server shutdown.
 */
const closeDb = () => {
  db.close(() => {
    console.log('Database connection closed.');
  });
};

process.on('SIGINT', closeDb);
process.on('SIGTERM', closeDb);
