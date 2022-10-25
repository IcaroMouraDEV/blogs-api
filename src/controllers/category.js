const { CategoryService } = require('../services');

const insertCategory = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await CategoryService.insertCategory(name);
  
  if (type) return res.status(400).json({ message });

  res.status(201).json(message);
};

const getAllCategory = async (_req, res) => {
  const result = await CategoryService.getAllCategory();
  
  res.status(200).json(result);
};

module.exports = {
  getAllCategory,
  insertCategory,
};