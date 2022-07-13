const { guestBookHandler } = require('./handlers/guestBookHandler.js');
const { serveFileContent } = require('./handlers/serveFileContent.js');
const { notFoundHandler } = require('./handlers/notFoundHandler.js');
const { createRouter } = require('./server/createRouter.js');
const { parseParams } = require('./handlers/parseParams.js');
const { logReq } = require('./handlers/logReq.js');
const { apiHandler } = require('./handlers/apiHandler.js');
const { logOutHandler } = require('./handlers/logOutHandler.js');
const { signUpHandler } = require('./handlers/signUpHandler.js');
const { injectCookie } = require('./handlers/injectCookie.js');
const { injectSession } = require('./handlers/injectSession.js');
const { logInHandler } = require('./handlers/logInHandler.js');
const { authenticationHandler } = require('./handlers/authenticationHandler.js');

const createApp = (config) => {
  const handlers = [
    parseParams,
    logReq,
    injectCookie,
    injectSession(config.sessions),
    logInHandler(config.sessions, config.users),
    authenticationHandler,
    signUpHandler(config.users),
    logOutHandler(config.sessions),
    apiHandler,
    serveFileContent(config.path),
    guestBookHandler(config.guestBookFile),
    notFoundHandler
  ];
  return createRouter(handlers);
};

module.exports = { createApp };
