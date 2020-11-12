process.env.NODE_ENV = "test"
const app = require("../app")
const request = require("supertest")
const connection = require("../db/connection");

describe("/api", () => {
    afterAll(() => {
        return connection.destroy()
    })
    beforeEach(() => {
        return connection.seed.run()
    })
    describe("testing the topics api", () => {
    it("responds with a 200 ok", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then((res) => {
                expect(res.body.topics).toEqual(expect.any(Array));
                expect(Object.keys(res.body.topics[0]))
                    .toEqual(expect.arrayContaining(["slug", "description"]))            
        })
    })
 }) 
    describe("/missingRoute", () => {
        it("status 404 - All methods", () => {
            const allMethods = ["get", "post", "delete", "patch", "put"]
            const methodPromises = allMethods.map((method) => {
                return request(app)
                [method]("/missingRoute")
                    .expect(404)
                    .then(({ body }) => {
                    expect(body.msg).toBe("Route not found")
                })
            })
            return Promise.all(methodPromises)
        })
    })
    describe("testing the users api", () => {
    it("responds with a 200 ok and the appropriate object body", () => {
         return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
                .then((res) => {
                   expect(res.body.user[0]).toEqual({
                            username: 'butter_bridge',
                            name: 'jonny',
                            avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
                           })
                })
            })
        it("returns an array that contains the correct properties", () => {
            return request(app)
                .get("/api/users/butter_bridge")
                .expect(200)
                .then((res) => {
                     expect(res.body.user).toEqual(expect.any(Array))
                     expect(Object.keys(res.body.user[0]))
                        .toEqual(expect.arrayContaining(["username", "avatar_url", "name"]))
            })
        })
    })
    describe("testing the articles api", () => {
        describe("get methods", () => {
        
        it("responds with a 200 ok and an array of articles", () => {
            return request(app)
                .get("/api/articles")
                .expect(200)
                .then(res => {
                expect(res.body.articles).toEqual(expect.any(Array));
            })
        })
        it("responds with an array thats sorted by desc date", () => {
            return request(app)
                .get("/api/articles?sort_by=created_at")
                .expect(200)
                .then(res => {
                    expect(res.body.articles).toBeSorted({ descending: true })
                })
        })
        it("responds with an array with only articles from butter_bridge", () => {
            return request(app)
                .get("/api/articles?author=butter_bridge")
            .expect(200)
                .then(res => {
                    expect(res.body.articles.length).toBe(3)
                    expect(res.body.articles).toSatisfyAll((article) => {
                        return article.author === "butter_bridge"
                    })
            })
        })
        it("responds with an array with only articles from butter_bridge", () => {
            return request(app)
                .get("/api/articles?topic=mitch")
            .expect(200)
                .then(res => {
                expect(res.body.articles.length).toBe(11)
            })
        })
        })
        describe("patch methods", () => {
            it("responds with a 200 and the updated object body with decreased votes", () => {
                return request(app)
                    .patch("/api/articles/1")
                    .send({ inc_votes: -99 })
                    .expect(200)
                    .then((res) => {
                        expect(res.body.article).toEqual({
                            "article_id": 1,
                            "author": "butter_bridge",
                            "body": "I find this existence challenging",
                            "created_at": "2018-11-15T12:21:54.171Z",
                            "title": "Living in the shadow of a great man",
                            "topic": "mitch",
                            "votes": 1,
                            "comment_count": "13"
                        })
                    })
            })
        it("responds with a 200 and the updated object body with increased votes", () => {
            return request(app)
                .patch("/api/articles/1")
                .send({ inc_votes: 99 })
                .expect(200)
                .then((res) => {
                    expect(res.body.article).toEqual({
                        "article_id": 1,
                        "author": "butter_bridge",
                        "body": "I find this existence challenging",
                        "created_at": "2018-11-15T12:21:54.171Z",
                        "title": "Living in the shadow of a great man",
                        "topic": "mitch",
                        "votes": 199,
                        "comment_count": "13"
                    })
                })
        })
        })
        })
    describe("testing the comments api", () => {
        describe("post requests", () => {
        it("responds with a 201 and and the posted comment", () => {
            return request(app)
                .post("/api/articles/1/comments")
                .send({ username: "butter_bridge", body: "Well theres always something to do" })
                .expect(201)
                .then((res) => {
                   expect(Object.keys(res.body.comment[0]))
                       .toEqual(expect.arrayContaining(["comment_id", "author", "article_id",
                           "votes","created_at","body"]))
                })
        })
            })
        describe("get requests", () => {
            it("responds with a 200 ok and an array of comments for given article id", () => {
                return request(app)
                    .get("/api/articles/1/comments?sort_by=created_at")
                    .expect(200)
                    .then(res => {
                       expect(res.body.comments).toEqual(expect.any(Array));
                    })
            })
            it("checks that the comments are sorted in the correct order", () => {
                return request(app)
                    .get("/api/articles/1/comments?sort_by=created_at")
                    .expect(200)
                    .then(res => {
                    expect(res.body.comments).toBeSorted({ descending: true })
                })
            })
            it("checks that we get an array with the correct properties", () => {
                return request(app)
                .get("/api/articles/1/comments?sort_by=created_at")
                .expect(200)
                .then((res) => {
                   expect(Object.keys(res.body.comments[0]))
                       .toEqual(expect.arrayContaining(["comment_id", "author","votes","created_at","body"]))
                })
            })
            it("responds with a 200 ok and an array of comments", () => {
                return request(app)
                    .get("/api/comments/1")
                    .expect(200)
                    .then(res => {
                        expect(res.body.comment).toEqual(expect.any(Array));
                    })
            })
        })
        describe("patch requests", () => {
            it("responds with a 200 and the updated object body with decreased votes", () => {
                return request(app)
                    .patch("/api/comments/1")
                    .send({ inc_votes: -99 })
                    .expect(200)
                    .then((res) => {
                        expect(res.body.comment).toEqual([{
                            "article_id": 9,
                            "author": "butter_bridge",
                            "body": "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
                            "comment_id": 1,
                            "created_at": "2017-11-22T12:36:03.389Z",
                            "votes": -83
                        }])
                        
                    })
            })
            it("responds with a 200 and the updated object body with increased votes", () => {
                return request(app)
                    .patch("/api/comments/1")
                    .send({ inc_votes: 17 })
                    .expect(200)
                    .then((res) => {
                        expect(res.body.comment).toEqual([{
                            "article_id": 9,
                            "author": "butter_bridge",
                            "body": "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
                            "comment_id": 1,
                            "created_at": "2017-11-22T12:36:03.389Z",
                            "votes": 33
                        }])
                        
                    })
            })
            })
        describe("delete requests", () => {
        test('deletes comment by Id', () => {
        return request(app)
            .del('/api/comments/1')
            .expect(200)
            .then((res) => {
                expect(res.body.msg).toEqual("no content")
            })
    })
        })
    })
});
