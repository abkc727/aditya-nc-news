const express = require('express');
const { getTopics } = require('./controllers/topics-controllers');
const { getApis } = require('./controllers/api-controllers');
const app = express();


app.use(express.json());

app.get('/api', getApis);
app.get('/api/topics', getTopics);

module.exports = app;
