const path = require('path');
const handler = require('./handler');
const fs = require('fs');

const router = (req, res) => {
  const { url: endpoint } = req;
  if (endpoint === '/') {
    handler.handlePublic(res, path.join('public', 'login.html'));
  } 
  else if (endpoint === '/redirect') {
    handler.handlePublic(res, path.join('public', 'redirect.html'));

  }
  else if (endpoint.includes('public')) {
    handler.handlePublic(res, path.join('public','..',endpoint));
  } else if (endpoint === '/insert') {
    handler.handleInsert(req, res);
  } else if (endpoint === '/booksList') {
    handler.handleBooklist(req, res);
  }
  else if (endpoint === '/signUp'){

    handler.signUp(req, res);

  } else {
    handler.handleNotFound(req, res);
  }
};
module.exports = router;
