const notFoundHandler = (request, response) => {
  response.setHeader('content-Type', 'text/plain');
  response.statusCode = 404;
  response.end(`${request.url.pathname} not found`);
  return true;
};

module.exports = { notFoundHandler };
