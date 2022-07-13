const parseCookies = (rawCookie) => {
  const cookies = {};
  rawCookie.split(';').forEach(cookie => {
    const [field, value] = cookie.split('=');
    cookies[field] = value;
  });
  return cookies;
};

const injectCookie = (req, res, next) => {
  if (req.headers.cookie) {
    req.cookies = parseCookies(req.headers.cookie);
  };
  next();
};

module.exports = { injectCookie };
