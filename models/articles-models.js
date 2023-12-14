const db = require("../db/connection");

exports.selectArticlesById = (articleId) => {
  const queryStr =
    "SELECT articles.*, CAST((SELECT COUNT(*) FROM comments WHERE article_id = $1) AS INTEGER) AS comment_count FROM articles WHERE article_id = $1";

  return db.query(queryStr, [articleId]).then((result) => {
    if (!result.rows.length) {
      return Promise.reject({ status: 404, msg: "article does not exist" });
    }

    return result.rows[0];
  });
};

exports.selectArticles = (queryObj) => {
  const { order, sort_by, topic } = queryObj;
  const queryValues = [];

  
  const sortColumn = sort_by || "created_at";
  const sortOrder = order || "desc";
  const validSortBy = ["created_at", "comment_count", "votes"];
  const validOrder = ["asc", "desc"];
  
  let queryStr =
    "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST((select count(*) FROM comments WHERE article_id = articles.article_id) AS INTEGER) AS comment_count FROM articles";
  
    if (topic) {
    queryValues.push(topic);
    queryStr += ` WHERE articles.topic = $1`;

  }

  if (
    (sortColumn && !validSortBy.includes(sortColumn)) ||
    (sortOrder && !validOrder.includes(sortOrder)) 
  ) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  if (sortColumn && sortOrder) {
    queryStr += ` ORDER BY ${sortColumn} ${sortOrder} `;
   
  }





  return db.query(queryStr, queryValues).then((result) => {
    return result.rows;
  });
};

exports.updateArticle = (articleId, incVotes) => {
  const queryStr =
    "UPDATE articles SET votes = votes+$1 WHERE article_id = $2 RETURNING *";
  return db.query(queryStr, [incVotes, articleId]).then((result) => {
    if (!result.rows.length) {
      return Promise.reject({ status: 404, msg: "article does not exist" });
    }

    return result.rows[0];
  });
};
