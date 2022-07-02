const { guestBookHandler } = require('./handlers/guestBookHandler.js');
const { serveFileContent } = require('./handlers/serveFileContent.js');
const { notFoundHandler } = require('./handlers/notFoundHandler.js');
const { createRouter } = require('./server/createRouter.js');

const handlers = [
  guestBookHandler,
  serveFileContent('./public'),
  notFoundHandler
];

const app = () => createRouter(handlers);

module.exports = { app };
