const { patchComments , getCommentById, deleteComments} = require("../controllers/comments")
const commentsRouter = require("express").Router();


// commentsRouter.route("/")
commentsRouter.route("/:comment_id")
    .get(getCommentById)
    .patch(patchComments)
    .delete(deleteComments)

module.exports = commentsRouter;
