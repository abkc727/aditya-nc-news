const { getArticleById, getArticles, patchArticle } = require("./controllers/articles-controllers");
const {
  handleFourOFourErrors,
  handlePsqlErrors,
  handleServerErrors,
  handleCustomErrors,
} = require("./errors/errors");
const express = require('express');
const { getTopics } = require('./controllers/topics-controllers');
const { getApis } = require('./controllers/api-controllers');
const { postComment, getCommentsByArticleId, deleteCommentById } = require("./controllers/comments-controllers");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.post("/api/articles/:article_id/comments", postComment)
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.get('/api', getApis);
app.get('/api/topics', getTopics);
app.delete('/api/comments/:comment_id', deleteCommentById)
app.patch("/api/articles/:article_id", patchArticle);
app.use(handleFourOFourErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
app.use(handleCustomErrors);

module.exports = app;
