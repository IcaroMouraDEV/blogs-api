const { CategoryService } = require('../services');

const insertCategory = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await CategoryService.insertCategory(name);
  
  if (type) return res.status(400).json({ message });

  res.status(201).json(message);
};

module.exports = {
  insertCategory,
};