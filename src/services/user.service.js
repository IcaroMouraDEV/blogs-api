const { User } = require('../models');
const { validateUser } = require('./validation/validationSchema');

const insertUser = async (user) => {
  const { type, message } = validateUser(user);

  if (type) return { type, message };

  const userExist = await User.findOne({ where: { email: user.email } });

  if (userExist) return { type: 'exist', message: 'User already registered' };

  const newUser = await User.create(user);

  return { type: null, message: newUser };
};

const getByEmail = async (email) => {
  const result = await User.findOne({ where: { email } });

  return result;
};

const getByUserId = async (id) => {
  const result = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (!result) return { type: 'error', message: 'User does not exist' };

  return { type: null, message: result };
};

const getAllUser = async () => {
  const result = await User.findAll({ attributes: { exclude: ['password'] } });

  return result;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });

  return { type: null, message: [] };
};

module.exports = {
  getByEmail,
  getByUserId,
  getAllUser,
  insertUser,
  deleteUser,
};