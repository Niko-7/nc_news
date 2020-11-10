const { fetchArticleById, updateArticleById } = require("../models/articles")
const { postComment } = require("../models/articles")


exports.getArticleById = (req, res, next) => {
    fetchArticleById(req.params).then((article) => {
        res.status(200).send({article : article})
    })
    .catch(next)
}

exports.patchArticleById = (req, res, next) => {
    updateArticleById(req.params, req.body).then((updatedArticle) => {
       res.status(200).send({article : updatedArticle})
    })
    .catch(next)
}




exports.postCommentByUser = (req, res, next) => {
    postComment(req.params, req.body).then(postedComment => {
        console.log(postedComment)
       res.status(201).send({comment : postedComment})
   })
    .catch(next)
}