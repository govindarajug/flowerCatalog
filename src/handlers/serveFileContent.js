const fs = require('fs');

const serveFileContent = (serveFrom) => {
  return (request, response) => {
    const fileName = serveFrom + request.url.pathname;

    if (request.url.pathname === '/') {
      response.setHeader('location', '/homepage.html');
      response.statusCode = 302;
      response.end('');
      return true;
    }
    if (!fs.existsSync(fileName)) {
      return false;
    }
    const body = fs.readFileSync(fileName);
    const ext = fileName.slice(fileName.lastIndexOf('.') + 1);
    response.setHeader('content-type', `text/${ext}`);
    response.statusCode = 200;
    response.end(body);
    return true;
  };
};

module.exports = { serveFileContent };
