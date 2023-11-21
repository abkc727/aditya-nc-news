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

exports.selectArticles = () => {
     return db
      .query("SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST((select count(*) FROM comments WHERE article_id = articles.article_id) AS INTEGER) AS comment_count FROM articles ORDER BY created_at DESC")
      .then((result) => {

        return result.rows;
      })
      .catch((err)=> {
        console.log(err)
      })
  };
  

  
