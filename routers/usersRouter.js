const { getUserById, getUsers, postUser } = require("../controllers/users");
const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers).post(postUser);
usersRouter.route("/:username").get(getUserById);

module.exports = usersRouter;
