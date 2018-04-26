const db_connection = require('../db_connection.js');
const bcrypt = require('bcryptjs');

// const dataUser = dataUser.email;

const checkuser = (email, password, cb) => {
  const sql = {
    text: `SELECT * FROM users WHERE email=$1`,
    values: [email]
  };

  db_connection.query(sql, (err, result) => {

    if (err) {
      return cb(err);
    } else {
      cb(null, result.rows)

    }

  })
}



module.exports = {
  checkuser
};