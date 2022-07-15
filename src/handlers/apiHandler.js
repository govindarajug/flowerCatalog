const fs = require('fs');

const apiHandler = (req, res, next) => {
  const comments = JSON.parse(fs.readFileSync('data/guestBook.json'));

  if (req.url === '/api/comments' && req.method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify(comments));
    return;
  }
  next();
};

module.exports = { apiHandler };
