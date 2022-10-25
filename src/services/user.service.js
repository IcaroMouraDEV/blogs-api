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

module.exports = {
  getByEmail,
  insertUser,
};