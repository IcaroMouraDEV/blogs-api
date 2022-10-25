const express = require('express');
const category = require('../controllers/category');
const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/', auth, category.insertCategory);
route.get('/', auth, category.getAllCategory);

module.exports = route;