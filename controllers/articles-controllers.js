const { selectArticlesById, selectArticles } = require("../models/articles-models");

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

    selectArticles()
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch((err) => {
        console.log(err)
        next(err);
      });
  };