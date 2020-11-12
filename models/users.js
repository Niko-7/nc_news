const connection = require("../db/connection")



const fetchUserById = (id) => {
  return connection
    .select("*")
    .from("users")
    .where(id)
}



module.exports = { fetchUserById }