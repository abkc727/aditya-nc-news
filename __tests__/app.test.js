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

describe("/api/articles/:article_id", () => {
  test("GET:200 To check if it sends a single article to the client", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        expect(response.body.article.article_id).toBe(1);
        expect(response.body.article.title).toBe(
          "Living in the shadow of a great man"
        );
        expect(response.body.article.topic).toBe("mitch");
        expect(response.body.article.author).toBe("butter_bridge");
        expect(response.body.article.body).toBe(
          "I find this existence challenging"
        );
        const expectedDate = new Date("2020-07-09 21:11:00");
        expect(response.body.article.created_at).toEqual(
          expectedDate.toISOString()
        );
        expect(response.body.article.votes).toBe(100);
        expect(response.body.article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("GET:404 sends an appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/9999999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("article does not exist");
      });
  });
  test("GET:400 sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/not-an-article")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
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

describe("/api/articles/:article_id/comments", () => {
  test("GET:200 To check if it sends the comments from a single article to the client", () => {
    return request(app)
      .get("/api/articles/6/comments")
      .expect(200)
      .then((response) => {
        expect(response.body.comments.length).toBe(1);
        response.body.comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(comment.article_id).toBe(6);
          expect(typeof comment.created_at).toBe("string");
        });
      });
  });

  test("GET:200 To check if it sends the results are sorted when there are multiple comments for an article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        expect(response.body.comments.length).toBe(11);
        expect(response.body.comments).toBeSortedBy("created_at", {
          descending: true,
        });
        response.body.comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(comment.article_id).toBe(1);
          expect(typeof comment.created_at).toBe("string");
        });
      });
  });
});

describe("/api/articles", () => {
  test("GET:200 to check the number or responses and type of the properties making sure 'body' is not present", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body.articles.length).toBe(13);
        response.body.articles.forEach((article) => {
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.title).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.author).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("number");
          expect(Object.hasOwn(article, "body")).toBe(false);
        });
      });
  });

  test("GET:404 sends an appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/555/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("No comments for this article");
      });
  });
  test("GET:400 sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/not-an-article/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
});
