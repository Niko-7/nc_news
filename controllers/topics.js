const { fetchTopic, sendTopic } = require("../models/topics");

exports.getTopic = (req, res, next) => {
  fetchTopic()
    .then((topics) => {
      res.status(200).send({ queries: [], topics: topics });
    })
    .catch(next);
};

exports.postTopic = (req, res, next) => {
  sendTopic(req.body)
    .then((topic) => {
      res.status(201).send({ topic: topic[0] });
    })
    .catch(next);
};
