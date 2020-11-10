const { fetchUserById } = require("../models/users")


exports.getUserById = (req, res, next) => {
  fetchUserById(req.params).then(foundUser => {
    res.status(200).send({user: foundUser})
  }).catch(next)
}
   
