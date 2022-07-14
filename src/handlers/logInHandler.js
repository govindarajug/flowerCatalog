const updateSessions = (sessions, id, username) => {
  sessions[id] = {
    username,
    id,
    time: new Date().toLocaleString()
  };
};

const redirectTo = (res, path) => {
  res.setHeader('Location', path);
  res.statusCode = 302;
  res.end();
  return;
};

const logInHandler = (sessions, users) => {
  let id = 1;
  return (req, res, next) => {
    if (req.url.pathname === '/login' && req.method === 'POST') {
      if (req.cookies) {
        redirectTo(res, '/guestBook');
        return;
      };

      const username = req.bodyParams.get('username');
      if (username) {
        if (!users.includes(username)) {
          redirectTo(res, '/signup.html');
          return;
        };

        users.push(username);
        updateSessions(sessions, id, username);
        res.setHeader('set-cookie', `id=${id}`);
        id++;
        redirectTo(res, '/guestBook');
        return;
      }
      redirectTo(res, '/login.html');
      return;
    };
    next();
  };
};

module.exports = { logInHandler };
