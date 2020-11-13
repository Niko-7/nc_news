const connection = require("../db/connection");

const fetchTopic = () => {
  return connection.select("slug", "description").from("topics");
};

const sendTopic = (body) => {
  return connection.into("topics").insert(body).returning("*");
};

module.exports = { fetchTopic, sendTopic };
