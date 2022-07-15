const { guestBookHandler } = require('./handlers/guestBookHandler.js');
const { logReq } = require('./handlers/logReq.js');
const { apiHandler } = require('./handlers/apiHandler.js');
const { logOutHandler } = require('./handlers/logOutHandler.js');
const { signUpHandler } = require('./handlers/signUpHandler.js');
const { injectCookie } = require('./handlers/injectCookie.js');
const { injectSession } = require('./handlers/injectSession.js');
const { logInHandler } = require('./handlers/logInHandler.js');
const { authenticationHandler } = require('./handlers/authenticationHandler.js');

const createApp = (config) => {
  const express = require('express');
  const app = express();
  app.use(express.urlencoded({ extended: true }));

  app.use(logReq);
  app.use(injectCookie);
  app.use(injectSession(config.sessions));
  app.post('/login', logInHandler(config.sessions, config.users));
  app.use(authenticationHandler);
  app.post('/comment', guestBookHandler(config.guestBookFile));
  app.get('/api/comments', apiHandler);
  app.post('/signup', signUpHandler(config.users));
  app.get('/logout', logOutHandler(config.sessions));
  app.get('/guestBook', guestBookHandler(config.guestBookFile));
  app.use(express.static('./public'));

  return app;
};

module.exports = { createApp };
