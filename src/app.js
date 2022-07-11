const { guestBookHandler } = require('./handlers/guestBookHandler.js');
const { serveFileContent } = require('./handlers/serveFileContent.js');
const { notFoundHandler } = require('./handlers/notFoundHandler.js');
const { createRouter } = require('./server/createRouter.js');
const { parseParams } = require('./handlers/parseParams.js');
const { logReq } = require('./handlers/logReq.js');

const handlers = [
  parseParams,
  logReq,
  guestBookHandler,
  serveFileContent('./public'),
  notFoundHandler
];

const app = () => createRouter(handlers);

module.exports = { app };
