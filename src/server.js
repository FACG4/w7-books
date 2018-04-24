const http = require('http');
const router = require('./router');

const port = process.env.PORT || 3000;
const host = process.env.HOSTNAME || 'localhost';

const server = http.createServer(router);
server.listen(port, host, () => {
  console.log(`check our site  http://${host}:${port} `);
});
