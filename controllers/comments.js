const {
  updateComment,
  fetchCommentById,
  deleteCommentById,
} = require("../models/comments");

exports.getCommentById = (req, res, next) => {
  fetchCommentById(req.params)
    .then((comment) => {
      res.status(200).send({ comment: comment });
    })
    .catch(next);
};

exports.patchComments = (req, res, next) => {
  updateComment(req.params, req.body)
    .then((updatedComment) => {
      res.status(200).send({ comment: updatedComment[0] });
    })
    .catch(next);
};

exports.deleteComments = (req, res, next) => {
  deleteCommentById(req.params)
    .then(() => {
      res.status(204).send({ msg: "no content" });
    })
    .catch(next);
};
