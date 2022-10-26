const express = require('express');
const post = require('../controllers/post');
const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/', auth, post.insertPost);
route.get('/', auth, post.getAllPost);
route.get('/:id', auth, post.getPostById);

module.exports = route;