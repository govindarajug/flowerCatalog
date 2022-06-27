const { createServer } = require('net');
const { commentHandler } = require('./src/commentHandler.js');
const { parseRequest } = require('./src/parseRequestLine.js');
const { Response } = require('./src/response.js');
const { serveFileContent } = require('./src/serveFileContent.js');

const handle = (request, response, serveFrom) => {
  const handlers = [
    commentHandler,
    serveFileContent
  ];
  for (const handler of handlers) {
    if (handler(request, response, serveFrom)) {
      return true;
    }
  }
  return false;
};

const startServer = (port, handle, serveFrom = 'public') => {
  const server = createServer((socket) => {
    socket.on('data', (data) => {
      const request = parseRequest(data.toString());
      console.log(request.method, request.uri);
      const response = new Response(socket);
      handle(request, response, serveFrom);
    });
    socket.on('error', (err) => {
      console.log(err);
    });
  });

  server.listen(port);
};

startServer(12345, handle);

