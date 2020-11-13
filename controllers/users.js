const { fetchUserById, fetchUsers, sendUser } = require("../models/users");
const endpoints = {
  allTopics: "/api/topics",
  userByName: "/api/users/:username",
  articleById: "/api/articles/:article_id",
  commentByArticleId: "/api/articles/:article_id/comments",
  allArticles: "/api/articles",
  commentById: "/api/comments/:comment_id",
};

exports.getUserById = (req, res, next) => {
  fetchUserById(req.params)
    .then((foundUser) => {
      res.status(200).send({ user: foundUser[0] });
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  sendUser(req.body)
    .then((user) => {
      res.status(201).send({ user: user[0] });
    })
    .catch(next);
};

exports.getJson = (req, res, next) => {
  res.status(200).send({ endpoints: endpoints }).catch(next);
};
