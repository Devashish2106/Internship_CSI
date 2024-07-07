const { verifyToken } = require('../auth');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided.' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).send({ message: 'Failed to authenticate token.' });
  }

  req.userId = decoded.id;
  next();
};

module.exports = authMiddleware;
