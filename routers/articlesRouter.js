const {
  getArticleById,
  patchArticleById,
  postCommentByUser,
  getCommentById,
  getArticles,
  deleteArticle
} = require("../controllers/articles");

const articlesRouter = require("express").Router();

articlesRouter.route("/").get(getArticles);
articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .delete(deleteArticle);
articlesRouter
  .route("/:article_id/comments")
  .post(postCommentByUser)
  .get(getCommentById);

module.exports = articlesRouter;
