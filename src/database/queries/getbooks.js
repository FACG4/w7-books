const db_connection = require('../db_connection.js');

const getBooks = (cb) => {
  db_connection.query('SELECT * FROM books', (err, res) => {
    if (err) {
      return cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getBooksReserve = (cb) => {
  db_connection.query('SELECT * FROM BOOKS INNER JOIN reserve ON books.id = reserve.book_id ', (err, res) => {
    if (err) {
      return cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = {
  getBooks,
  getBooksReserve
};
