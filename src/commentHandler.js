const fs = require('fs');

const getComment = (request, response) => {
  const comment = {};
  request.url.searchParams.forEach((value, name) => {
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
  response.end('', writeToFile(request.comments, 'public/guestBook.json'));
  return true;
};

module.exports = { commentHandler };
