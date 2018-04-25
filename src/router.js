const path = require('path');
const handler = require('./handler');
const fs = require('fs');

const router = (req, res) => {
  let filesInFolder = [];
  function getFiles(root) {
    fs.readdirSync(root).forEach((file) => {
      if (!fs.statSync(root + '/' + file).isDirectory()) {
        filesInFolder.push(root.replace('./public', '') + '/' + file);
      } else getFiles(root + '/' + file);
    });
  }
  getFiles('./public')

  const { url: endpoint } = req;
  if (endpoint === '/') {
    handler.handlePublic(res, path.join('public', 'login.html'));

  } else if (endpoint.includes('public')) {
    console.log(endpoint);

    handler.handlePublic(res, path.join('public', 'signUp.html'));

  }else if(endpoint==='/userPanel') {
      handler.handlePublic(res, path.join('public', 'userPanel.html'));


  }
    else if (filesInFolder.includes(endpoint)) {
  handler.handlePublic(res, path.join('public',endpoint));
  }  else if (endpoint === '/insert') {
    handler.handleInsert(req, res);
  } else if (endpoint === '/booksList') {
    handler.handleBooklist(req, res);
  }
  else if (endpoint === '/signUp'){

    handler.signUp(req, res);

  }
  else if (endpoint === '/login'){

    handler.handlerUser(req, res);

  }

  else {
    handler.handleNotFound(req, res);
  }
};
module.exports = router;
