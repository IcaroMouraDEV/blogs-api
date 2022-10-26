const express = require('express');
const post = require('../controllers/post');
const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/', auth, post.insertCategory);
// route.get('/', auth, post.getAllCategory);

module.exports = route;