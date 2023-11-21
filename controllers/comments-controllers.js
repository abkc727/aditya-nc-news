const articles = require("../db/data/test-data/articles");
const { selectCommentsByArticleId } = require("../models/comments-models");


exports.getCommentsByArticleId = (req, res, next) => {
    const articleId = req.params.article_id;
    selectCommentsByArticleId(articleId)
      .then((comments) => {
        res.status(200).send(comments);
      })
      .catch((err) => {

        next(err);
      });
  };
  