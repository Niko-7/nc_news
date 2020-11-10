const connection = require("../db/connection")



const fetchUserById = (id) => {
  return connection
    .select("*")
    .from("users")
    .where(id)
    // .then(response => {
    //   return response[0]
    // })
}

module.exports = { fetchUserById }