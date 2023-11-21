const { selectArticlesById } = require("../models/articles-models");

exports.getArticleById = (req, res, next) => {
    const articleId = req.params.article_id
    selectArticlesById(articleId)
    .then((article) => {
        console.log(article)
      res.status(200).send({ article });
    })
    .catch((err)=> {
    })
  };
