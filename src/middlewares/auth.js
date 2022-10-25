const jwt = require('jsonwebtoken');

require('dotenv').config();
const { UserService } = require('../services');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserService.getByUserId(decoded.data.userId);

    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};