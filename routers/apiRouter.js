const users = require("../db/data/test-data/users");
const articlesRouter = require("./articlesRouter");
const topicsRouter = require("./topicsRouter");
const usersRouter = require("./usersRouter")
const apiRouter = require("express").Router();


apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);



module.exports = apiRouter;