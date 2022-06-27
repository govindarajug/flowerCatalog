const { createServer } = require('net');
const { parseRequest } = require('./src/parseRequestLine.js');
const { Response } = require('./src/response.js');
const { serveFileContent } = require('./src/serveFileContent.js');


const startServer = (port, handler, serveFrom = 'public') => {
  const server = createServer((socket) => {
    socket.on('data', (data) => {
      const request = parseRequest(data.toString());
      console.log(request.method, request.uri);
      const response = new Response(socket);
      handler(request, response, serveFrom);
    });
    socket.on('error', (err) => {
      console.log(err);
    });
  });

  server.listen(port);
};

startServer(12345, serveFileContent);

