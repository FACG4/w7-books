const fs = require('fs');
const querystring = require('querystring');
const path = require('path');
const insertbooks = require('./database/queries/insertbooks');
const booksList = require('./database/queries/reserve');
const checkuser = require('./database/queries/checkuser');
const insertuser = require('./database/queries/insertuser');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const {parse} = require('cookie');

const contentType = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  jpg: 'image/jpg',
  png: 'image/png',
  json: 'application/json',
  ico: 'image/ico'
};

const handlePublic = (res, endpoint) => {
  const extention = endpoint.split('.')[1];
  fs.readFile(path.join(__dirname, '..', endpoint), (error, data) => {
    if (error) {
      res.writeHead(500, 'Content-Type:text/html');
      res.end(
        '<h1>Sorry, there was a problem loading the homepage</h1>'
      );
    } else {
      res.writeHead(200, {
        'Content-Type': contentType[extention],
      });
      res.end(data);
    }
  });
}

const getName  = (req,cb) => {
  
  const cookie = parse(req.headers.cookie);  
    jwt.verify(cookie.token,'inass', (err, token) => {
      if(err) {
        console.log('error');
      } else {
       cb( token.username);        
      }
    });
}


const handleUserName = (req,res, endpoint) => {  
  if (req.headers.cookie) {
    const name = parse(req.headers.cookie);
    jwt.verify(name.token,'inass', (err, token) => {
      if(err) {
        res.writeHead(403, 'Content-Type: text/html');
        res.end('<h1>Go Away!!</h1>');
      } else {        
        handlePublic(res, endpoint);
      }
    })
  } else {
    res.writeHead(302, {Location:'/'});
    res.end();
  }
};

const handleInsert = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const book = querystring.parse(data);
    const {
      name: book_name,
      year,
      author
    } = book;
    insertbooks.insertBooks(book_name, year, author, (err, result) => {
      if (err) {
        res.writeHead(500, 'Content-Type: text/html');
        res.end('<h1>Sorry, there was a problem adding that book</h1>');
      } else {
        res.writeHead(200, 'Content-Type: text/html');
        res.end('<h1>successfully added</h1>');
      }
    });
  });
}

const handleBooklist = (req, res) => {
  getName(req,name=>{
  booksList.reserve((err, result) => {
    if (err) {
      res.writeHead(500, 'Content-Type:text/html');
      res.end('<h1>Sorry, there was a problem getting the users<h1>');
    } else {
      result[0].username = name;
      
      let output = JSON.stringify(result);
      res.writeHead(200, {
        'content-type': 'application/json'
      });      
      res.end(output);
    }
  });
});
};

const handleNotFound = (req, res) => {
  res.writeHead(404, 'Content-type : text/html');
  res.end('<h1>Page not found</h1>');
};

const hashPassword = (password, cb) => {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      cb(err)
    } else {

      bcrypt.hash(password, salt, cb)

    }
  });
};

const handlerUser = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const users = querystring.parse(data);
    const {
      email,
      psw
    } = users;
    checkuser.checkuser(email, psw, (err, result) => {
      if (err) {
        res.writeHead(500, 'Content-Type: text/html');
        res.end('<h1>Sorry, there was a problem adding that User</h1>');
      } else if (result.length === 0) {
        res.end('the user not registerd');
      } else {
        const userData = {
          userId: result[0].id,
          username: result[0].first_name +' '+result[0].last_name 
        }
        const token = jwt.sign(userData, 'inass')
        bcrypt.compare(psw, result[0].password, (err, resBoolean) => {

          if (!resBoolean) {
            res.writeHead(500, 'Content-Type: text/html');
            res.end('<h1>error in your password</h1>');
          } else {
            res.writeHead(302, {
              Location: '/userPanel',
              'Set-Cookie': `token=${token}; httpOnly`
            });
            res.end();
          }
        });
      }
    });
  });
}

const logout = (req, res) => {
  res.writeHead(302, {
    Location: '/',
    'Set-Cookie': `token=0; Max-Age=0`,
  });
  res.end();
};

const signUp = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const users = querystring.parse(data);
    const {
      fname,
      lname,
      email,
      password
    } = users;

    hashPassword(password, (err, hashedPassword) => {
      if (err) {
        res.writeHead(403, 'Content-Type: text/html');
        res.end('<h1>Something very bad happend !! close your Laptop</h1>');
      } else {
        insertuser.insertUsers(fname, lname, email, hashedPassword, (err, result) => {

          if (err) {
            res.writeHead(500, 'Content-Type: text/html');
            res.end('<h1>Sorry, there was a problem adding that user</h1>');
          } else {
            res.writeHead(302, {
              Location: '/'
            });
            res.end();
          }
        });
      }
    })
  })
}

module.exports = {
  handlePublic,
  handleInsert,
  handleBooklist,
  logout,
  handleNotFound,
  signUp,
  handlerUser,
  handleUserName,
  getName
};