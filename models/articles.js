const connection = require("../db/connection")


const fetchArticleById = (id) => {
    return connection
        .select("articles.*")
        .count("comment_id AS comment_count")
        .from("articles")
        .where({"articles.article_id" : id.article_id})
        .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
        .groupBy("articles.article_id")
        
}

const updateArticleById = (id, body) => {
    
    return connection
        
        .from("articles")
        .where(id)
        .increment("votes", body.inc_votes)
        .then(() => {
            return fetchArticleById(id)
        })
        .then(articles => {

        return articles[0]
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

const fetchCommentById = (id, { sort_by = "created_at", order = "desc" }, limit=10, p = 0) => {
    return connection
        .select("*")
        .from("comments")
        .where(id)
        .orderBy(sort_by, order)
        .limit(limit)
        .offset(p)
}

const fetchArticles = ({ sort_by = "created_at", order = "desc"}, limit = 11,
    p = 0, author, topic) => {
    const query = connection
        .select("articles.*")
        .count("comment_id AS comment_count")
        .from("articles")
        .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
        .groupBy("articles.article_id")
        .orderBy(sort_by, order)
        .limit(limit)
        .offset(p)
        
    if (author) query.where({ 'articles.author': author })
    else if (topic) query.where({ "articles.topic": topic })
    
  return query;
}

module.exports = {
    fetchArticleById,
    updateArticleById,
    postComment,
    fetchCommentById,
    fetchArticles
}

