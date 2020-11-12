const { fetchUserById } = require("../models/users")
const endpoints = 
    {
    "greeting": "Hello and welcome , below you will find all the possible endpoints and the methods they have available. Enjoy!",
    "users": "To GET a user /api/:username",
    "articles": { "articleEndpoint": "To GET all articles /api/articles", 
    "articleQueries" : "we can sort by a column either asc or desc or filter by an author or topic , examples /api/articles?sort_by=votes ,api/articles?author=butter_bridge api/articles?topic=mitch" }
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