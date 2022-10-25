const { Category } = require('../models');
const { validateCategory } = require('./validation/validationSchema');

const insertCategory = async (name) => {
  const { type, message } = validateCategory(name);

  if (type) return { type, message };

  const newCategory = await Category.create({ name });

  return { type: null, message: newCategory };
};

const getAllCategory = async () => {
  const result = await Category.findAll();

  return result;
};

module.exports = {
  insertCategory,
  getAllCategory,
};