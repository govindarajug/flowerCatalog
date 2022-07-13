const http = require('http');

const startServer = (port, app) => {
  const httpServer = http.createServer(app);

  httpServer.listen(port, () => {
    console.log('Started listening on', port);
  });
};

exports.startServer = startServer;
