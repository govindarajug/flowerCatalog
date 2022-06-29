const http = require('http');
const { guestBookHandler } = require('./src/guestBookHandler.js');
const { serveFileContent } = require('./src/serveFileContent.js');
const { notFoundHandler } = require('./src/notFoundHandler.js');

const handle = (request, response) => {
  const handlers = [
    guestBookHandler,
    serveFileContent('./public'),
    notFoundHandler
  ];
  request.url = new URL(`http://${request.headers.host}${request.url}`);
  for (const handler of handlers) {
    if (handler(request, response)) {
      return true;
    }
  }
  return false;
};

const httpServer = http.createServer(handle);

httpServer.listen(9090, () => {
  console.log('Started listening on 9090');
});
