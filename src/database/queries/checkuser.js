const db_connection = require('../db_connection.js');
const checkuser = (cb) => {

  db_connection.query('SELECT Password FROM users',(err,res) => {
    if(err){
      return cb(err);
    }else{
      cb(null, res.rows);
    }
  })
}
