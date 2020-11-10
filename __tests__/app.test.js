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
        it("responds with a 200 ok and the appropriate object body", () => {
            return request(app)
                .get("/api/articles/1")
                .expect(200)
                .then((res) => {
                    expect(res.body.article[0]).toEqual({
                        "article_id": 1,   
                        "author": "butter_bridge",
                        "body": "I find this existence challenging",
                        "created_at": "2018-11-15T12:21:54.171Z",
                        "title": "Living in the shadow of a great man",
                        "topic": "mitch",
                        "votes": 100,
                        "comment_count": 1,  
                })
            })
        })

        it("responds with a 200 and the updated object body with decreased votes", () => {
            return request(app)
                .patch("/api/articles/1")
                .send({ inc_votes: -99 })
                .expect(200)
                .then((res) => {
                    expect(res.body.article[0]).toEqual({
                        "article_id": 1,
                        "author": "butter_bridge",
                        "body": "I find this existence challenging",
                        "created_at": "2018-11-15T12:21:54.171Z",
                        "title": "Living in the shadow of a great man",
                        "topic": "mitch",
                        "votes": 1,
                        "comment_count": 1
                    })
                })
        })
        it("responds with a 200 and the updated object body with increased votes", () => {
            return request(app)
                .patch("/api/articles/1")
                .send({ inc_votes: 99 })
                .expect(200)
                .then((res) => {
                    expect(res.body.article[0]).toEqual({
                        "article_id": 1,
                        "author": "butter_bridge",
                        "body": "I find this existence challenging",
                        "created_at": "2018-11-15T12:21:54.171Z",
                        "title": "Living in the shadow of a great man",
                        "topic": "mitch",
                        "votes": 199,
                        "comment_count": 1
                    })
                })
        })
    })
    describe("testing the comments api", () => {
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
});