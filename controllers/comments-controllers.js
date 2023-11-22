const { addComment, selectCommentsByArticleId } = require("../models/comments-models");

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

}
  


exports.getCommentsByArticleId = (req, res, next) => {
    const articleId = req.params.article_id;
    selectCommentsByArticleId(articleId)
      .then((comments) => {
        res.status(200).send({comments: comments});
      })
      .catch((err) => {
        next(err);
      });
  };

