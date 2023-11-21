const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
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

describe("/api/articles/:article_id", () => {
  test("GET:200 To check if it sends a single article to the client", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        expect(response.body.article.article_id).toBe(1);
        expect(response.body.article.title).toBe('Living in the shadow of a great man');
        expect(response.body.article.topic).toBe('mitch');
        expect(response.body.article.author).toBe('butter_bridge');
        expect(response.body.article.body).toBe('I find this existence challenging');
        //expect(response.body.article.created_at).toBe('2020-07-09 21:11:00');
        expect(response.body.article.votes).toBe(100);
        expect(response.body.article.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700');

      });
  });
});
