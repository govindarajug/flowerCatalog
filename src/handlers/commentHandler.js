const fs = require('fs');

const getComment = (request, response) => {
  const comment = {};
  request.bodyParams.forEach((value, name) => {
    comment[name] = value;
  });
  comment.date = new Date().toLocaleString();
  return comment;
};

const writeToFile = (content, fileName) => {
  return () => {
    fs.writeFile(fileName, JSON.stringify(content), 'utf-8', (err) => {
      if (err) console.log(err);
    });
  };
};

const commentHandler = (request, response) => {
  const comment = getComment(request, response);
  request.comments.unshift(comment);
  response.setHeader('Location', '/guestBook');
  response.statusCode = 302;
  response.end('', writeToFile(request.comments, 'data/guestBook.json'));
  return;
};

module.exports = { commentHandler };
