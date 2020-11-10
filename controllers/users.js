const { fetchUserById } = require("../models/users")


exports.getUserById = (req, res, next) => {

    const id = req.params
    console.log(id)
  fetchUserById(id).then(foundUser => {
    res.status(200).send({user: foundUser})
  }).catch(next)
}
   
