const connection = require("../db/connection");

const fetchUserById = (id) => {
  return connection.select("*").from("users").where(id);
};

const fetchUsers = () => {
  return connection.select("*").from("users")
}

const sendUser = (body) => {
  return connection.into("users").insert(body).returning("*");
};

module.exports = { fetchUserById, fetchUsers, sendUser };
