const express = require('express');
const login = require('../controllers/login');

const route = express.Router();

route.post('/', login);

module.exports = route;