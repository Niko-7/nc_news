const connection = require("../db/connection")


const fetchArticleById = (id) => { 
    return connection
        .select("*")
        .from("articles")
        .where(id)
        .then((res) => {
            res[0].comment_count = res.length
            return res
    })
}

const updateArticleById = (id, body) => {
    return connection
        .select("*")
        .from("articles")
        .where(id)
        .then((res) => {
            res[0].comment_count = res.length
            res[0].votes = res[0].votes + body.inc_votes
            return res
    })
}

const postComment = (id, body) => {
    const newObj = {
        author: body.username,
        article_id: +id.article_id,
        body: body.body
    }
    return connection
        .into("comments")
        .insert(newObj)
        .returning("*")
        
} 




module.exports = { fetchArticleById, updateArticleById, postComment }
