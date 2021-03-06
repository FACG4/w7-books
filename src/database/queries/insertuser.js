const db_connection = require('../db_connection');

const insertUsers = (first_name, last_name, email, password, cb) => {
  let sql = {
    text: 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3 ,$4)',
    values: [first_name, last_name, email, password]
  };
  db_connection.query(sql, (err, res) => {

    if (err) {
      return cb(err);
    } else {
      cb(null, res)
    }
  });

};

module.exports = {
  insertUsers
};