const { User } = require('../models');

const getByEmail = async (email) => {
  const result = await User.findOne({ where: { email } });

  return result;
};

module.exports = {
  getByEmail,
};