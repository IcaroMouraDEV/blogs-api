const { PostService } = require('../services');

const insertPost = async (req, res) => {
  const { userId } = req.auth;
  const blogPost = req.body;
  const { type, message } = await PostService.insertBlogPost({ userId, ...blogPost });
  if (type) return res.status(400).json({ message });

  res.status(201).json(message);
};

const getAllPost = async (_req, res) => {
  const message = await PostService.getAllPost();

  res.status(200).json(message);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await PostService.getPostById(id);

  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};

module.exports = {
  insertPost,
  getAllPost,
  getPostById,
};