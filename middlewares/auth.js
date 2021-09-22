const jwt = require('jsonwebtoken');
const Forbidden = require('../errors/forbidden');
const { JWT_SECRET } = require('../config');
const { FORBIDDEN } = require('../constant');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new Forbidden(FORBIDDEN.text);
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Forbidden(FORBIDDEN.text);
  }

  req.user = payload;
  return next();
};
