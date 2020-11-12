const { fetchUserById } = require("../models/users")
const endpoints = require("../endpoints.json")

exports.getUserById = (req, res, next) => {
  fetchUserById(req.params).then(foundUser => {
    res.status(200).send({user: foundUser})
  }).catch(next)
}
   
exports.getJson = (req, res, next) => {
res.status(200).send(endpoints)
}