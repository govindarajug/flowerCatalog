const fs = require('fs');

const MIMETYPES = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.json': 'application/json',
  '.js': 'text/javascript',
  '.gif': 'image/gif'
};

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
    const ext = fileName.slice(fileName.lastIndexOf('.'));
    response.setHeader('content-type', MIMETYPES[ext] || 'text/plain');
    response.statusCode = 200;
    response.end(body);
    return;
  };
};

module.exports = { serveFileContent };
