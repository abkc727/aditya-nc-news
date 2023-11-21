const { getArticleById } = require("./controllers/articles-controllers");
const {
  handleFourOFourErrors,
  handlePsqlErrors,
} = require("./errors/articles-errors");
const express = require('express');
const { getTopics } = require('./controllers/topics-controllers');
const { getApis } = require('./controllers/api-controllers');
const app = express();


app.use(express.json());
app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);
app.use(handleFourOFourErrors);
app.use(handlePsqlErrors);

app.get('/api', getApis);
app.get('/api/topics', getTopics);

module.exports = app;
