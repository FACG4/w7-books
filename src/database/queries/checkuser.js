const db_connection = require('../db_connection.js');
const bcrypt = require('bcryptjs');

// const dataUser = dataUser.email;

const checkuser = (dataUser,cb) => {
  const sql = {
              text:`SELECT * FROM users WHERE email=$1`,
              values : [dataUser]
            };

  db_connection.query(sql,(err,result) => {
    console.log(result.rows);

    if(err){
      return cb(err);
    }else{
      const passwordDB = result.rows[0].password;
      const passwordUser = dataUser.password;
      const comparePassword = bcrypt.compareSync(passwordUser,passwordDB);
      cb(null,passwordCom, result.rows);
    }
  })
}



module.exports = {
checkuser};
