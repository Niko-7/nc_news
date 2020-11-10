const { getArticleById, patchArticleById } = require("../controllers/articles")
const { postCommentByUser } = require("../controllers/articles")
const articlesRouter = require("express").Router();



articlesRouter.route("/")
articlesRouter.route("/:article_id").get(getArticleById).patch(patchArticleById)
articlesRouter.route("/:article_id/comments").post(postCommentByUser)



module.exports = articlesRouter;





