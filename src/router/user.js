const express = require('express');
const user = require('../controllers/user');
const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/', user.insertUser);
route.get('/', auth, user.getAllUser);

module.exports = route;