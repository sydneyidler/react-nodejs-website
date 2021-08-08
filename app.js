require("dotenv").config();
const express = require("express");
const statistic = require("./api/statistic");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "client/dist")));

app.use("/statistic", statistic);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

app.get(/(stats|user-stats)/, (req, res) => {
  res.redirect("/");
});

const server = app.listen(3000, () => {
  console.log("App listening at http://localhost:3000");
});

const closeServer = () => {
  server.close(() => {
    console.log("Http server closed.");
  });
};

process.on("SIGINT", closeServer);
process.on("SIGTERM", closeServer);
