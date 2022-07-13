const authenticationHandler = (req, res, next) => {
  if (req.url.pathname === '/guestBook' && !req.session) {
    res.setHeader('location', '/login.html');
    res.statusCode = 302;
    res.end();
    return;
  };
  next();
  // res.setHeader('location', '/login.html');
  // res.statusCode = 302;
  // res.end();
};

module.exports = { authenticationHandler };
