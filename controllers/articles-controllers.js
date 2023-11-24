const { selectArticlesById, selectArticles, updateArticle } = require("../models/articles-models");
const { checkTopicExists } = require("../models/topics-models");

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  selectArticlesById(articleId)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  const {topic} = req.query

  const articlePromises = [selectArticles(topic)]
  
  if(topic) {
    articlePromises.push(checkTopicExists(topic))
  }
  
    Promise.all(articlePromises)
      .then((resolvedPromises) => {
        const articles = resolvedPromises[0]
        res.status(200).send({ articles });
      })
      .catch((err) => {
        next(err);
      });
  };

  exports.patchArticle = (req, res, next) => {
    const articleId = req.params.article_id
    const incVotes = req.body.inc_votes
    updateArticle(articleId, incVotes)
      .then((article) => {
        res.status(200).send({ article });
      })
      .catch((err) => {
        next(err);
      });
  };