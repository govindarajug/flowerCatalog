const fs = require('fs');

const serveFileContent = (request, response, serveFrom) => {
  const { uri } = request;
  const fileName = serveFrom + uri;

  if (uri === '/') {
    response.setHeader('location', '/homepage.html');
    response.send('', 302);
    return true;
  }
  if (!fs.existsSync(fileName)) {
    return false;
  }
  const body = fs.readFileSync(fileName);
  const ext = fileName.slice(fileName.lastIndexOf('.') + 1);
  response.setHeader('content-type', `text/${ext}`);
  response.send(body, 200);
  return true;
};

module.exports = { serveFileContent };
