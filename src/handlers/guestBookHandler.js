const fs = require("fs");
const { commentHandler } = require("./commentHandler");

const toHTML = (object, tag) => {
  const values = Object.values(object).join(' ');
  return `<${tag}>${values}</${tag}>`;
};

const generateGuestBook = (request, response) => {
  const parsedComments = request.comments.map(x => toHTML(x, 'div')).join('\n');
  const template = fs.readFileSync('src/template/template.html', 'utf-8');
  response.end(template.replace('__comments__', parsedComments));
};

const guestBookHandler = (request, response) => {
  const comments = JSON.parse(fs.readFileSync('data/guestBook.json'));

  if (request.url.pathname === '/guestBook') {
    request.comments = comments;
    generateGuestBook(request, response);
    return true;
  }
  if (request.url.pathname === '/comment') {
    request.comments = comments;
    commentHandler(request, response);
    return true;
  }
  return false;
};

module.exports = { guestBookHandler };
