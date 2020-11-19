
exports.up = function(knex) {
  
    return knex.schema.createTable("comments", (commentsTable) => { 
        commentsTable.increments("comment_id").primary();
        commentsTable.text("author").references("users.username").notNull();
        commentsTable
          .integer("article_id")
          .references("articles.article_id")
          .notNull();
        commentsTable.integer("votes").defaultTo(0);
        commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
        commentsTable.text("body").notNull();
    })
};

exports.down = function(knex) {
   
    return knex.schema.dropTable("comments")
};
