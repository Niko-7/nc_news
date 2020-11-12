const users = require("../db/data/test-data/users");
const articlesRouter = require("./articlesRouter");
const topicsRouter = require("./topicsRouter");
const usersRouter = require("./usersRouter")
const commentsRouter = require("./commentsRouter")
const apiRouter = require("express").Router();
const getJson = require("../controllers/users")

apiRouter.route("/").get(getJson)
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);


module.exports = apiRouter;