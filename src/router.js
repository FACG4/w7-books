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
    handler.handlePublic(res, path.join('public', 'index.html'));
  } else if (filesInFolder.includes(endpoint)) {
    handler.handlePublic(res, path.join('public',endpoint));
  }  else if (endpoint === '/insert') {
    handler.handleInsert(req, res);
  } else if (endpoint === '/booksList') {
    handler.handleBooklist(req, res);
  } else {
    handler.handleNotFound(req, res);
  }
};
module.exports = router;
