const db = require('../db/connection');

exports.addComment = (newComment, articleId) => {
    const {username, body} = newComment
    const queryStr = 'INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *'
    return db
    .query(queryStr, [body, username, articleId])
    .then((result) => {
        if (!result.rows.length) {
            return Promise.reject({ status: 404, msg: "article does not exist" });
          }
    
          return result.rows[0];
        
    })
}

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
