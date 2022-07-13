const injectSession = (sessions) => {
  return (req, res, next) => {
    if (req.cookies) {
      const id = req.cookies.id;
      req.session = sessions[id];
    }
    next();
  };
};

module.exports = { injectSession };
