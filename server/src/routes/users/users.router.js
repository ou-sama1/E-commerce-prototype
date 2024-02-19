const express = require('express');

const { httpSignup, httpLogin } = require('./users.controller');

const usersRoute = express.Router();

usersRoute.post('/signup', httpSignup);
usersRoute.post('/login', httpLogin);

module.exports = usersRoute;