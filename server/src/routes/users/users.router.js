const express = require('express');

const { httpSignup, httpLogin, httpAddToFavorites, httpGetFavorites } = require('./users.controller');
const { requireAuth } = require('../../middlewares/requireAuth');

const usersRoute = express.Router();

usersRoute.post('/signup', httpSignup);
usersRoute.post('/login', httpLogin);
usersRoute.get('/favorites', requireAuth, httpGetFavorites);
usersRoute.post('/favorites', requireAuth, httpAddToFavorites);

module.exports = usersRoute;