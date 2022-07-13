const { createApp } = require("./src/app.js");
const { startServer } = require("./src/server/server");

const config = {
  users: [],
  sessions: {},
  path: './public',
  guestBookFile: 'data/guestBook.json'
};

startServer(9090, createApp(config));
