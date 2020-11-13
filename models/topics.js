const connection = require("../db/connection");

const fetchTopic = () => {
  return connection.select("slug", "description").from("topics");
};

module.exports = { fetchTopic };
