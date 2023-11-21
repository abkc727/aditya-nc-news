const db = require("../db/connection");

exports.selectArticlesById = (articleId) => {
  return db
    .query("SELECT * FROM articles where article_id = $1", [articleId])
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      }

      return result.rows[0];
    });
};
