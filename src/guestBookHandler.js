const fs = require("fs");

const toHTML = (object, tag) => {
  const values = Object.values(object).join(' ');
  return `<${tag}>${values}</${tag}>`;
};

const generateGuestBook = (response) => {
  let comments = JSON.parse(fs.readFileSync('public/guestBook.json', 'utf-8'));
  const parsedComments = comments.map(x => toHTML(x, 'div'));
  comments = toHTML(parsedComments, 'div');
  const pageData = fs.readFileSync('public/template.html', 'utf-8');
  response.send(pageData.replace('__comments__', comments));
};

const guestBookHandler = (request, response) => {
  const { uri } = request;
  if (uri === '/guestBook') {
    generateGuestBook(response);
    return true;
  }
  return false;
};

module.exports = { guestBookHandler };
