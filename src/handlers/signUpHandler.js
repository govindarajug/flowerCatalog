const signUpHandler = (users) => {
  return (req, res, next) => {
    if (req.url.pathname === '/signup') {
      const username = req.url.searchParams.get('username');
      if (!username) {
        res.setHeader('location', '/signup.html');
        res.statusCode = 302;
        res.end();
        return;
      }
      users.push(username);
      res.setHeader('location', '/login');
      res.statusCode = 302;
      res.end();
      return;
    }
    next();
  };
};

module.exports = { signUpHandler };
