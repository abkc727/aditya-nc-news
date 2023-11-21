const db = require('../db/connection');

exports.selectArticlesById = (articleId) => {
    return db
    .query('SELECT * FROM articles where article_id = $1',[articleId])
    .then((result) => {
        return result.rows[0];
    })
}