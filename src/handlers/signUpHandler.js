const signUpHandler = (users) => {
  return (req, res, next) => {
    if (req.url === '/signup') {
      const username = req.body.username;
      if (!username) {
        res.setHeader('location', '/signup.html');
        res.statusCode = 401;
        res.end();
        return;
      }
      users.push(username);
      res.setHeader('location', '/login.html');
      res.statusCode = 302;
      res.end();
      return;
    }
    next();
  };
};

module.exports = { signUpHandler };
