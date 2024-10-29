const jwt = require('jsonwebtoken');

checkToken = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(403).json({ message: 'You are not authorized ' });
    }
    const token = bearerToken.split(' ')[1];
    const decoded = jwt.verify(token, '2930ru8h24r84fh8hh380her98h398h');

    next();
  } catch (e) {
    return res.status(403).json({ message: 'You are not authorized' });
  }
};

module.exports = checkToken;
