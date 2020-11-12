const { fetchUserById } = require("../models/users")
const endpoints = 
    {
   "allTopics": "/api/topics",
   "userByName": "/api/users/:username",
   "articleById": "/api/articles/:article_id",
   "commentByArticleId": "/api/articles/:article_id/comments",
   "allArticles":"/api/articles",
   "commentById":"/api/comments/:comment_id"
}


exports.getUserById = (req, res, next) => {
  fetchUserById(req.params).then(foundUser => {
    res.status(200).send({user: foundUser})
  }).catch(next)
}
   
exports.getJson = (req, res, next) => {
  res.status(200).send({ endpoints: endpoints })
    .catch(next)
}