const db = require("../db/connection");

exports.selectCommentsByArticleId = (articleId) => {
  return db
    .query("SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC", [articleId])
    .then(
        (result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "No comments for this article" });
      }

      return result.rows;
    }
    );
};
