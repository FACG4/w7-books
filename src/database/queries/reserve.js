const db_connection = require('../db_connection');
const reserve = (cb) => {
  db_connection.query('SELECT * FROM books LEFT JOIN reserve on books.id = reserve.book_id where start_date is  null',
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        cb(null, res.rows);
      }
    });
};

module.exports = {reserve};
