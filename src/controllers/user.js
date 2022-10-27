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

const getAllUser = async (_req, res) => {
  const message = await UserService.getAllUser();

  res.status(200).json(message);
};

const getByUserId = async (req, res) => {
  const { id } = req.params;
  
  const { type, message } = await UserService.getByUserId(id);

  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};

const deleteUser = async (req, res) => {
  const { userId } = req.auth;
  const { message } = await UserService.deleteUser(userId);

  res.status(204).json(message);
};

module.exports = {
  insertUser,
  getAllUser,
  getByUserId,
  deleteUser,
};