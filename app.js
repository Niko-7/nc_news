const express = require("express");
const app = express();
const apiRouter = require("./routers/apiRouter");
const {send404 , handleInternalServerErrors, handlePSQLErrors } = require("./controllers/errors")
const { intro } = require("./controllers/errors")

app.use(express.json());

app.use("/api", apiRouter);
app.route("").get(intro)


app.all("/*", send404)

app.use(handlePSQLErrors)
app.use(handleInternalServerErrors)




module.exports = app;