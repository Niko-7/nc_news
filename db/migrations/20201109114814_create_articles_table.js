const articles = require("../data/development-data/articles");

exports.up = function(knex) {
 
    return knex.schema.createTable("articles", (articlesTable) => { 
        articlesTable.increments("article_id").primary();
        articlesTable.text("title").notNull();
        articlesTable.text("body").notNull();
        articlesTable.integer("votes").defaultTo(0);
        articlesTable.text("topic").references("topics.slug").notNull();
        articlesTable.text("author").references("users.username").notNull();
        articlesTable.timestamp("created_at").defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    
    return knex.schema.dropTable("articles")
};
