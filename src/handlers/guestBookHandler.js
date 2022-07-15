const fs = require('fs');

const toHTML = (object, tag) => {
  const values = Object.values(object).join(' ');
  return `<${tag}>${values}</${tag}>`;
};

const writeToFile = (content, fileName) => {
  return () => {
    fs.writeFile(fileName, JSON.stringify(content), 'utf-8', (err) => {
      if (err) console.log(err);
    });
  };
};

const getComment = (request, response) => {
  const comment = {};
  comment.name = request.session.username;
  comment.comment = request.body.comment;
  comment.date = new Date().toLocaleString();
  return comment;
};

const generateGuestBook = (request, response) => {
  const parsedComments = request.comments.map(x => toHTML(x, 'div')).join('\n');
  const template = fs.readFileSync('src/template/template.html', 'utf-8');
  let content = template.replace('__comments__', parsedComments);
  content = content.replace('__name__', request.session.username);
  response.end(content);
};

const guestBookHandler = (guestBookFile) => {
  return (request, response, next) => {
    const comments = JSON.parse(fs.readFileSync(guestBookFile));

    if (request.url === '/guestBook') {
      request.comments = comments;
      generateGuestBook(request, response);
      return;
    }
    if (request.url === '/comment') {
      request.comments = comments;
      const comment = getComment(request, response);
      request.comments.unshift(comment);
      response.statusCode = 201;
      response.end('', writeToFile(request.comments, guestBookFile));
      return;
    }
    next();
  };
};

module.exports = { guestBookHandler };
