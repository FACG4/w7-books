const fs = require('fs');
const querystring = require('querystring');
const path = require('path');
const insertbooks = require('./database/queries/insertbooks');
const booksList = require('./database/queries/reserve');
const checkuser = require('./database/queries/checkuser');
const insertuser = require('./database/queries/insertuser');
const bcrypt = require('bcryptjs');


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
      console.log(error);
    } else {
      res.writeHead(200, {
        'Content-Type': contentType[extention],
      });
      res.end(data);
    }
  });
};

const handlerUser = (req, res) => {
  // console.log(req);
  let dataUser = '';
  req.on('data',(chunk) =>{
    dataUser += chunk;
  });
  req.on('end',()=>{
    const users = querystring.parse(dataUser);
    const {email:email,password: password} = users;
    checkuser.checkuser(users,(err,result)=> {
      if(err){
        res.writeHead(500, 'Content-Type: text/html');
        res.end('<h1>Sorry, there was a problem of email or password</h1>');
        console.log(err);
      }else
      console.log("ajjaks");{
        res.writeHead(
        302,{
          'Location': '/',
          'Set-Cookie': 'logged_in=true; HttpOnly; Max-Age=86400'
        }
      );

       res.writeHead(302,{Location:'/userPanel'});
      }
    })
  })
}



const handleInsert = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const book = querystring.parse(data);
    const {name:book_name, year, author} = book;
    insertbooks.insertBooks(book_name, year, author, (err, result)=> {
      if (err) {
        res.writeHead(500, 'Content-Type: text/html');
        res.end('<h1>Sorry, there was a problem adding that book</h1>');
        console.log(err);
      } else {
        res.writeHead(200, 'Content-Type: text/html');
        res.end('<h1>successfully added</h1>');
      }
    });
  });
}

const handleBooklist = (req, res) => {
  booksList.reserve((err, result) => {
    if (err) {
      res.writeHead(500, 'Content-Type:text/html');
      res.end('<h1>Sorry, there was a problem getting the users<h1>');
      console.log(err);
    } else {
      let output = JSON.stringify(result);
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(output);
    }
  });
};

const handleNotFound = (req, res) => {
  res.writeHead(404, 'Content-type : text/html');
  res.end('<h1>Page not found</h1>');
};





const hashPassword = (password, cb) => {
  bcrypt.genSalt(10, function(err, salt) {
     if(err) {
       cb(err)
      } else {

        bcrypt.hash(password, salt,cb)

      }
    });
   };



const  signUp=(req,res) =>{
  let data='';
  req.on('data',(chunk)=>{
    data += chunk;

  });
  req.on('end',()=>{
    const users=querystring.parse(data);
    const{fname,lname,email ,password}=users;

 hashPassword(password,(err,hashedPassword) =>{
  if (err){
    console.error("Error in Hashing",err);
  }else {


    insertuser.insertUsers(fname,lname,email ,hashedPassword, (err, result)=> {

      if (err) {

        res.writeHead(500, 'Content-Type: text/html');
        res.end('<h1>Sorry, there was a problem adding that user</h1>');
        console.log(err);
      } else {
        res.writeHead(200, 'Content-Type: text/html');
        res.end('<h1>successfully added</h1>');
      }
    });


  }

 })







})
}


//     hashPassword(password, (err,hashedPassword) =>
//    console.log(hashedPassword)

//  );




  //   const passwordhashed= hashPassword(password,(err, result)=>{
  //     if (err){
  //       console.log("jjjj",result);
  //     }else {
  //       console.log("done");

  //     }

  //   }
  // );
  // console.log(p);






module.exports = {handlePublic,handleInsert, handleBooklist, handleNotFound,signUp,handlerUser};
