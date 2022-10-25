require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UserService } = require('../services');

const secret = process.env.JWT_SECRET;

const insertUser = async (req, res) => {
  const user = req.body;

  const { type, message } = await UserService.insertUser(user);
  
  if (type === 'exist') return res.status(409).json({ message });
  if (type) return res.status(400).json({ message });

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { userId: message.id } }, secret, jwtConfig);

  res.status(201).json({ token });
};

module.exports = {
  insertUser,
};