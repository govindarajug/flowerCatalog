const { createApp } = require("./src/app.js");
const { startServer } = require("./src/server/server");

const config = {
  path: './public',
  guestBookFile: 'data/guestBook.json'
};

startServer(9090, createApp(config));
