const logOutHandler = (sessions) => {
  return (req, res, next) => {
    if (req.url.pathname === '/logout') {
      if (req.session) {
        delete sessions[req.session.id];
        res.setHeader('set-cookie', `id=${req.session.id};max-age=0`);
      }
      res.setHeader('location', '/homepage.html');
      res.statusCode = 302;
      res.end('');
      return;
    }
    next();
  };
};

module.exports = { logOutHandler };
