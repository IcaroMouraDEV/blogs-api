const { BlogPost, Category, PostCategory } = require('../models');

const validateItem = (blogPost) => {
  if (!blogPost || !blogPost.title || !blogPost.content || !blogPost.categoryIds) {
    return 'error';
  }

  return null;
};

const validateItemToUpdate = (blogPost) => {
  if (!blogPost || !blogPost.title || !blogPost.content) {
    return 'error';
  }

  return null;
};

const transaction = async (post, ids) => {
  const blogPost = await BlogPost.create(post);

  ids.forEach(async (categoryId) => {
    await PostCategory.create({ postId: blogPost.id, categoryId });
  });

  return blogPost;
};

const insertBlogPost = async (blogPost) => {
  if (validateItem(blogPost)) return { type: 'error', message: 'Some required fields are missing' };

  const allCategory = await Category.findAll();
  const validadeIds = blogPost.categoryIds.map((categoryId) => {
    const validate = allCategory.find((item) => item.id === categoryId);

    if (!validate) return { type: 'error', message: 'one or more "categoryIds" not found' };

    return '';
  }).filter((item) => item !== '');

  if (validadeIds[0]) return validadeIds[0];

  const date = new Date();
  const post = {
    userId: blogPost.userId,
    title: blogPost.title,
    content: blogPost.content,
    published: date,
    updated: date,
  };
  const newBlog = await transaction(post, blogPost.categoryIds); 

  return { type: null, message: newBlog };
};

const getAllPost = async () => {
  const result = await BlogPost.findAll({
    include: { all: true, attributes: { exclude: ['password'] } },
});

  return result;
};

const getPostById = async (id) => {
  const result = await BlogPost.findOne({
    where: { id },
    include: { all: true, attributes: { exclude: ['password'] } },
  });

if (!result) return { type: 'error', message: 'Post does not exist' };

  return { type: null, message: result };
};

const updatePost = async ({ userId, postId }, blogUpdate) => {
  const validation = validateItemToUpdate(blogUpdate);

  if (validation) return { type: 'error', message: 'Some required fields are missing' };

  const post = await BlogPost.findOne({ where: { id: postId } });
  
  if (post.userId !== userId) return { type: 'unauthorized', message: 'Unauthorized user' };

  await BlogPost.update(
    { title: blogUpdate.title, content: blogUpdate.content },
    { where: { id: postId } },
  );

  const message = await BlogPost.findOne({
    where: { id: postId }, include: { all: true, attributes: { exclude: ['password'] } },
  });

  return { type: null, message };
};

const deletePost = async ({ userId, postId }) => {
  const post = await BlogPost.findOne({ where: { id: postId } });
  
  if (!post) return { type: 'not found', message: 'Post does not exist' };
  if (post.userId !== userId) return { type: 'unauthorized', message: 'Unauthorized user' };

  await BlogPost.destroy({ where: { id: postId } });

  return { type: null, message: [] };
};

module.exports = {
  insertBlogPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
};