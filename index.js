const { createApp } = require("./src/app.js");

const startServer = (port) => {
  const config = {
    users: [],
    sessions: {},
    guestBookFile: 'data/guestBook.json'
  };
  const app = createApp(config);
  app.listen(port, () => console.log(`Server listening on ${port}`));
};

startServer(9090);
