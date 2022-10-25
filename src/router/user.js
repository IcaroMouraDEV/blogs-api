const express = require('express');
const user = require('../controllers/user');
const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/', user.insertUser);
route.get('/', auth, user.getAllUser);
route.get('/:id', auth, user.getByUserId);

module.exports = route;