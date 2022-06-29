const fs = require('fs');

const addComment = (comment, fileName) => {
  let comments = [];
  if (fs.existsSync(fileName)) {
    comments = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  }
  comments.push(comment);
  fs.writeFile(fileName, JSON.stringify(comments), 'utf-8', (err) => {
    if (err) console.log(err);
  });
};

const commentHandler = (request, response) => {
  const { uri } = request;
  let comment = {};
  if (uri === '/comment') {
    comment = request.params;
    addComment(comment, 'public/guestBook.json');
    response.setHeader('Location', '/guestBook');
    response.send('', 301);
    return true;
  }
  return false;
};

module.exports = { commentHandler };
