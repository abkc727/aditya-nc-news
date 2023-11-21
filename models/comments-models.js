const db = require("../db/connection");

exports.selectCommentsByArticleId = (articleId) => {
  return db
    .query("SELECT * FROM comments WHERE article_id = $1", [articleId])
    .then(
        (result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      }

      return result.rows;
    }
    );
};

// comment_id
// votes
// created_at
// author
// body
// article_id