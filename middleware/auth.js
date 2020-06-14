const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header('x-auth-token');

  //check no token
  if (!token) {
    return res.status(401).json({ msg: 'Access denied' });
  }
  //verify token
  try {
    const decode = jwt.verify(token, config.get('jwtToken'));
    req.user = decode.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token not valid' });
  }
};
