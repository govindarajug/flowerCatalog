const authenticationHandler = (req, res, next) => {
  if (req.url === '/guestBook' && !req.session) {
    res.setHeader('location', '/login.html');
    res.statusCode = 302;
    res.end();
    return;
  };
  next();
};

module.exports = { authenticationHandler };
