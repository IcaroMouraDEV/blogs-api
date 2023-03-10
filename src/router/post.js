const express = require('express');
const post = require('../controllers/post');
const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/', auth, post.insertPost);
route.get('/search', auth, post.getPostByQuery);
route.get('/', auth, post.getAllPost);
route.get('/:id', auth, post.getPostById);
route.put('/:id', auth, post.updatePost);
route.delete('/:id', auth, post.deletePost);

module.exports = route;