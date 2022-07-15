const logReq = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

module.exports = { logReq };
