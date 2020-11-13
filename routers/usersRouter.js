const { getUserById } = require("../controllers/users");
const usersRouter = require("express").Router();

usersRouter.route("/");
usersRouter.route("/:username").get(getUserById);

module.exports = usersRouter;
