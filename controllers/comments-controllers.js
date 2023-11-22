const { addComment } = require("../models/comments-models");

exports.postComment = (req, res, next) => {

    const newComment = req.body
    const articleId = req.params.article_id
    addComment(newComment, articleId)
      .then((comment) => {
       
        res.status(201).send({ comment });
      })
      .catch((err) => {
        next(err);
      });
  };