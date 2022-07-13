const updateSessions = (sessions, id, username) => {
  sessions[id] = {
    username,
    id,
    time: new Date().toLocaleString()
  };
};

const logInHandler = (sessions, users) => {
  let id = 1;
  return (req, res, next) => {
    if (req.url.pathname === '/login') {
      if (req.cookies) {
        res.setHeader('Location', '/guestBook');
        res.statusCode = 302;
        res.end();
        return;
      };

      const username = req.url.searchParams.get('username');
      if (username) {
        if (!users.includes(username)) {
          res.setHeader('Location', '/signup.html');
          res.statusCode = 302;
          res.end();
          return;
        }

        users.push(username);
        updateSessions(sessions, id, username);
        res.setHeader('set-cookie', `id=${id}`);
        id++;
        res.setHeader('Location', '/guestBook');
        res.statusCode = 302;
        res.end();
        return;
      }
      res.setHeader('Location', '/login.html');
      res.statusCode = 302;
      res.end();
      return;
    };
    next();
  };
};

module.exports = { logInHandler };
