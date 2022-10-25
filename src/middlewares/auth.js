const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    
    const { data } = jwt.verify(token, process.env.JWT_SECRET);

    req.auth = data;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};