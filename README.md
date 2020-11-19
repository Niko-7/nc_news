# nc_news

Back-End project of an API containing articles, topics, comments and users data. 

Created with postgreSQL, Knex and express server. Have been using Jest for testing throughout the project.

Have implemented GET/POST/PATCH/DELETE requests and also have queries available in most end-points.

In the coming weeks i will use React.js to build the user interface and interactive elements on the website.

This project is currently functional as an API and beeing hosted by using Heroku : https://mitch-mitch.herokuapp.com/

A list of all the available endpoints which you can also find on the page : 
  
    allTopics: /api/topics
    userByName: /api/users/:username
    articleById: /api/articles/:article_id
    commentByArticleId: /api/articles/:article_id/comments
    allArticles: /api/articles
    commentById: /api/comments/:comment_id
