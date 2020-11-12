const connection = require("../db/connection")



const fetchCommentById = (id) => {
    return connection
        .select("*")
        .from("comments")
        .where({"comment_id" : id.comment_id})
        
}



const updateComment = (id, body) => { 
        return connection
        
        .from("comments")
        .where(id)
        .increment("votes", body.inc_votes)
        .then(() => {
            return fetchCommentById(id)
        })
        .then(comments => {

        return comments
    })
 }


    const deleteCommentById = (id) => {
    return connection
        .del("*")
        .from("comments")
        .where({"comment_id" : id.comment_id})
}

module.exports = { fetchCommentById, updateComment, deleteCommentById }