const express = require("express");
const app = express();
const apiRouter = require("./routers/apiRouter");
const {
  send404,
  handleInternalServerErrors,
  handlePSQLErrors,
} = require("./controllers/errors");
const { getJson } = require("./controllers/users");


app.use(express.json());
app.all("/", getJson)
app.use("/api", apiRouter);

app.all("*", send404);

app.use(handlePSQLErrors);
app.use(handleInternalServerErrors);

module.exports = app;
