const { getArticleById, getArticles, patchArticle } = require("./controllers/articles-controllers");
const {
  handleFourOFourErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors/errors");
const express = require('express');
const { getTopics } = require('./controllers/topics-controllers');
const { getApis } = require('./controllers/api-controllers');
const { getCommentsByArticleId } = require("./controllers/comments-controllers");
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.patch("/api/articles/:article_id", patchArticle);
app.use(handleFourOFourErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

app.get('/api', getApis);
app.get('/api/topics', getTopics);

module.exports = app;
