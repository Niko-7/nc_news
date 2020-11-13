## General Feedback
​
- You could go back and test the utils functions that you used in your formatting logic
- You could try using a `.notNull()` constraint in your migrations - this means postgres will throw an error if you try and insert something with a null value for this column.
- You can pass the query info into your `getArticles` controller in an object. At the moment, you have 2 arguments.
- Make sure you remove any `console.logs` in your code that you don't need anymore - e.g. line 6 in your `./controllers/errors.js`
- `updateComment` is currently invoking `fetchCommentById(id)` however you can just use `.returning('*')` to do the same thing
- In general, I think you need to do a bit more work on error-handling: I can see several places where you need to handle a potential 404.
- In some places your code isn't formatted properly (weird indentation for example). Ensure you install Prettier and format your code so the indentation and line breaks are consistent throughout your project
​
## API behaviour
​
Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.
​
### GET `/api/articles`
​
Assertion: the second article should have `article_id === 2`: expected 13 to equal 2
​
Hints:
​
- the default sort should be by `created_at` and the default order should be `desc`
​
### GET `/api/articles?order=asc`
​
Assertion: expected 'Living in the shadow of a great man' to equal 'Moustache'
​
Hints:
​
- accept an `order` query of `asc` or `desc`
​
### GET `/api/articles?topic=not-a-topic`
​
Assertion: expected 200 to equal 404
​
Hints:
​
- use a 404 status code, when provided a non-existent topic
- use a separate model to check whether the topic exists
​
### GET `/api/articles?author=not-an-author`
​
Assertion: expected 200 to equal 404
​
Hints:
​
- use a 404 status code, when provided a non-existent author
- use a separate model to check whether the author exists
​
error: select "articles".\*, count("comment_id") as "comment_count" from "articles" left join "comments" on "articles"."article_id" = "comments"."article_id" group by "articles"."article_id" order by "not-a-column" desc limit \$1 - column "not-a-column" does not exist
​
### GET `/api/articles/1000`
​
Assertion: expected 200 to equal 404
​
Hints:
​
- if an article is not found with a valid `article_id`, use a 404: Not Found status code
​
error: select "articles"._, count("comment_id") as "comment_count" from "articles" left join "comments" on "articles"."article_id" = "comments"."article_id" where "articles"."article_id" = \$1 group by "articles"."article_id" - invalid input syntax for integer: "dog"
error: select "articles"._, count("comment_id") as "comment_count" from "articles" left join "comments" on "articles"."article_id" = "comments"."article_id" where "articles"."article_id" = \$1 group by "articles"."article_id" - invalid input syntax for integer: "dog"
​
### GET `/api/articles/dog`
​
Assertion: expected 500 to equal 400
​
Hints:
​
- if send an invalid `article_id`, use a 400: Bad Request status code
​
### PUT `/api/articles/1`
​
Assertion: expected 404 to equal 405
​
Hints:
​
- use `.all()` on each route, to serve a 405: Method Not Found status code
​
### PATCH `/api/articles/1`
​
Assertion: expected 101 to equal 100
​
Hints:
​
- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1
​
error: update "articles" set "votes" = "votes" + $1 where "article_id" = $2 - invalid input syntax for integer: "NaN"
error: update "articles" set "votes" = "votes" + $1 where "article_id" = $2 - invalid input syntax for integer: "NaN"
​
### PATCH `/api/articles/1`
​
Assertion: expected 500 to equal 400
​
Hints:
​
- use a 400: Bad Request status code when sent an invalid `inc_votes` value
​
### GET `/api/articles/1000/comments`
​
Assertion: expected 200 to equal 404
​
Hints:
​
- return 404: Not Found when given a valid `article_id` that does not exist
​
error: select _ from "comments" where "article_id" = \$1 order by "created_at" desc - invalid input syntax for integer: "not-a-valid-id"
error: select _ from "comments" where "article_id" = \$1 order by "created_at" desc - invalid input syntax for integer: "not-a-valid-id"
​
### GET `/api/articles/not-a-valid-id/comments`
​
Assertion: expected 500 to equal 400
​
Hints:
​
- return 400: Bad Request when given an invalid `article_id`
​
error: select \* from "comments" where "article_id" = \$1 order by "not-a-valid-column" desc - column "not-a-valid-column" does not exist
​
### POST `/api/articles/1/comments`
​
Assertion: expected [ Array(1) ] to contain keys 'comment_id', 'author', 'body', 'votes', and 'created_at'
​
Hints:
​
- send the new comment back to the client in an object, with a key of comment: `{ comment: {} }`
- ensure all columns in the comments table match the README
​
### POST `/api/articles/1/comments`
​
Assertion: expected undefined to equal 0
​
Hints:
​
- default `votes` to `0` in the migrations
- default `created_at` to the current time in the migrations
​
### POST `/api/articles/1/comments`
​
Assertion: expected 201 to equal 400
​
Hints:
​
- use a 400: Bad Request status code when `POST` request does not include all the required keys
- use `notNullable` in migrations for required columns
​
error: insert into "comments" ("article_id", "author", "body") values ($1, $2, $3) returning * - insert or update on table "comments" violates foreign key constraint "comments_article_id_foreign"
error: insert into "comments" ("article_id", "author", "body") values ($1, $2, $3) returning \* - insert or update on table "comments" violates foreign key constraint "comments_article_id_foreign"
​
### POST `/api/articles/10000/comments`
​
Assertion: expected 500 to be one of [ 404, 422 ]
​
Hints:
​
- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid article ID that does not exist
​
error: insert into "comments" ("article_id", "author", "body") values ($1, $2, $3) returning * - invalid input syntax for integer: "NaN"
error: insert into "comments" ("article_id", "author", "body") values ($1, $2, $3) returning \* - invalid input syntax for integer: "NaN"
​
### POST `/api/articles/not-a-valid-id/comments`
​
Assertion: expected 500 to equal 400
​
Hints:
​
- use a 400: Bad Request when `POST` contains an invalid article_id
​
### PATCH `/api/comments/1`
​
Assertion: expected undefined to equal 1
​
Hints:
​
- send the updated comment back to the client in an object, with a key of comment: `{ comment: {} }`
​
### PATCH `/api/comments/1`
​
Assertion: expected undefined to equal 17
​
Hints:
​
- increment / decrement the `votes` of the specified article with the knex method **`increment`**
​
error: update "comments" set "votes" = "votes" + $1 where "comment_id" = $2 - invalid input syntax for integer: "NaN"
error: update "comments" set "votes" = "votes" + $1 where "comment_id" = $2 - invalid input syntax for integer: "NaN"
at Parser.parseErrorMessage (/Users/mitch/nc_work/remote-course/team-be-review-runner/evaluations/niko/node_modules/pg-protocol/dist/parser.js:278:15)
​
### PATCH `/api/comments/1`
​
Assertion: expected 500 to equal 400
​
Hints:
​
- use a 400: Bad Request status code when sent an invalid `inc_votes` value
​
### PATCH `/api/comments/1`
​
Assertion: socket hang up
​
Hints:
​
- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body
​
### PATCH `/api/comments/1000`
​
Assertion: expected 200 to equal 404
​
Hints:
​
- use a 404: Not Found when `PATCH` contains a valid comment_id that does not exist
​
error: update "comments" set "votes" = "votes" + $1 where "comment_id" = $2 - invalid input syntax for integer: "not-a-valid-id"
error: update "comments" set "votes" = "votes" + $1 where "comment_id" = $2 - invalid input syntax for integer: "not-a-valid-id"
​
### PATCH `/api/comments/not-a-valid-id`
​
Assertion: expected 500 to equal 400
​
Hints:
​
- use a 400: Bad Request when `PATCH` contains an invalid comment_id
​
error: update "comments" set "votes" = "votes" + $1 where "comment_id" = $2 - invalid input syntax for integer: "NaN"
error: update "comments" set "votes" = "votes" + $1 where "comment_id" = $2 - invalid input syntax for integer: "NaN"
​
### PATCH `/api/comments/1`
​
Assertion: expected 500 to equal 400
​
Hints:
​
- use a 400: Bad Request status code when sent an invalid `inc_votes` value
​
### DELETE `/api/comments/1`
​
Assertion: expected 200 to equal 204
​
Hints:
​
- use a 204: No Content status code
- do not return anything on the body
​
### DELETE `/api/comments/1000`
​
Assertion: expected 200 to equal 404
​
Hints:
​
- use a 404: Not Found when `DELETE` contains a valid comment_id that does not exist
​
error: delete from "comments" where "comment_id" = $1 returning * - invalid input syntax for integer: "not-a-number"
error: delete from "comments" where "comment_id" = $1 returning \* - invalid input syntax for integer: "not-a-number"
​
### DELETE `/api/comments/not-a-number`
​
Assertion: expected 500 to equal 400
​
Hints:
​
- use a 400: Bad Request when `DELETE` contains an invalid comment_id
​
### GET `/api/users/butter_bridge`
​
Assertion: expected [ Array(1) ] to be an object
​
Hints:
​
- send the user to the client in an object, with a key of `user`: `{ user: {} }`
- return the single user in an object, not in an array
- ensure there are no discrepancies between the README specification and your table column names
​
### GET `/api/users/not-a-username`
​
Assertion: expected 200 to equal 404
​
Hints:
​
- if a user is not found with a valid `user_id`, use a 404: Not Found status code