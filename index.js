const http = require('http');
const { app } = require("./src/app.js");

const httpServer = http.createServer(app());

httpServer.listen(9090, () => {
  console.log('Started listening on 9090');
});
