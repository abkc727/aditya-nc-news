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

exports.selectArticles = (topic) => {
  const queryValues = []

  let queryStr = "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST((select count(*) FROM comments WHERE article_id = articles.article_id) AS INTEGER) AS comment_count FROM articles"

  if(topic) {
    queryValues.push(topic)
    queryStr += " WHERE articles.topic = $1"
  }

  queryStr+= " ORDER BY created_at DESC"

     return db
      .query(queryStr, queryValues)
      .then((result) => {
        return result.rows;
      })
  };
  

  
  exports.updateArticle = (articleId, incVotes) => {
    const queryStr = 'UPDATE articles SET votes = votes+$1 WHERE article_id = $2 RETURNING *'
    return db
     .query(queryStr,[incVotes, articleId])
     .then((result) => {

      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      }

       return result.rows[0];
     })
 };
 

