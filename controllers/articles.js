const { fetchArticleById, updateArticleById , fetchCommentById, fetchArticles, postComment} = require("../models/articles")



exports.getArticleById = (req, res, next) => {
    fetchArticleById(req.params).then((article) => {
        res.status(200).send({article : article[0]})
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
       res.status(201).send({comment : postedComment})
   })
    .catch(next)
}

exports.getCommentById = (req, res, next) => {
    const id = req.params
    const query = req.query
    fetchCommentById(id, query).then(sortedComments => {
        res.status(200).send({comments : sortedComments})
    })
    .catch(next)
}

exports.getArticles = (req, res, next) => {
    const sort_by = req.query.sort_by
    const limit = req.query.limit
    const author = req.query.author
    const topic = req.query.topic
    
    fetchArticles({ sort_by },limit, author, topic).then(articles => {
        res.status(200).send({"queries": ["author", "topic", "sort_by", "order"],"total_count": articles.length, articles : articles})
    })
    .catch(next)
}