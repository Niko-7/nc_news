const { getTopic, postTopic } = require("../controllers/topics");
const topicsRouter = require("express").Router();

topicsRouter.route("/").get(getTopic).post(postTopic);

module.exports = topicsRouter;
