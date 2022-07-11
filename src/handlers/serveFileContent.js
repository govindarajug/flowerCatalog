const fs = require('fs');

const serveFileContent = (serveFrom) => {
  return (request, response, next) => {
    const fileName = serveFrom + request.url.pathname;

    if (request.url.pathname === '/') {
      response.setHeader('location', '/homepage.html');
      response.statusCode = 302;
      response.end('');
      return;
    }
    if (!fs.existsSync(fileName)) {
      next();
      return;
    }
    const body = fs.readFileSync(fileName);
    const ext = fileName.slice(fileName.lastIndexOf('.') + 1);
    response.setHeader('content-type', `text/${ext}`);
    response.statusCode = 200;
    response.end(body);
    return;
  };
};

module.exports = { serveFileContent };
