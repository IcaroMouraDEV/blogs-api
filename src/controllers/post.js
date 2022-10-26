const { PostService } = require('../services');

const insertCategory = async (req, res) => {
  const { userId } = req.auth;
  const blogPost = req.body;
  const { type, message } = await PostService.insertBlogPost({ userId, ...blogPost });
  if (type) return res.status(400).json({ message });

  res.status(201).json(message);
};

module.exports = {
  insertCategory,
};