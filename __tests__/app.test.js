const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const endpoints = require("../endpoints.json");

const {
  topicData,
  userData,
  articleData,
  commentData,
} = require("../db/data/test-data/index");
beforeEach(() => seed({ topicData, userData, articleData, commentData }));
afterAll(() => db.end());

describe("/api/topics", () => {
  test("GET:200 To check if it returns an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.topics)).toBe(true);
      });
  });

  test("GET:200 to check the number or responses and type of the properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(response.body.topics.length).toBe(3);
        response.body.topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});

describe("/api", () => {
  test("GET:200 To check if it returns an object", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(typeof response.body).toBe("object");
      });
  });

  test("GET:200 To check if the endpoints from the response matches the original endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const expectedEndpoints = endpoints;
        expect(response.body).toEqual({ endpoints: expectedEndpoints });
      });
  });
});
