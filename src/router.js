const path = require('path');
const handler = require('./handler');
const fs = require('fs');

const router = (req, res) => {
  const {
    url: endpoint
  } = req;
  if (endpoint === '/') {
    if(req.headers.cookie) {
      res.writeHead(302, {location: '/userPanel'});
      res.end()
    } else {

      handler.handlePublic(res, path.join('public', 'login.html'));
    }
  }  
  else if (endpoint === '/redirect') {
    handler.handlePublic(res, path.join('public', 'redirect.html'));

  }
  else if (endpoint === '/userPanel') {
    handler.handleUserName(req,res, path.join('public', 'userPanel.html'));

  } else if (endpoint === '/login') {

    handler.handlerUser(req, res);

  } 

  else if (endpoint === '/logout'){

    handler.logout(req, res);

  } else if (endpoint.includes('public')) {
    handler.handlePublic(res, path.join('public', '..', endpoint));
  } else if (endpoint === '/insert') {
    handler.handleInsert(req, res);
  } else if (endpoint === '/booksList') {
    handler.handleBooklist(req, res);
  } else if (endpoint === '/signUp') {

    handler.signUp(req, res);

  } else {
    handler.handleNotFound(req, res);
  }
};
module.exports = router;