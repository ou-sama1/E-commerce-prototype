const express = require('express');

const { httpSignup, httpLogin, httpAddToFavorites, httpGetFavorites } = require('./users.controller');
const requireAuth = require('../../middlewares/requireAuth');
const requireCaptcha = require('../../middlewares/requireCaptcha');

const usersRoute = express.Router();

usersRoute.post('/signup', requireCaptcha, httpSignup);
usersRoute.post('/login', httpLogin);
usersRoute.get('/favorites', requireAuth, httpGetFavorites);
usersRoute.post('/favorites', requireAuth, httpAddToFavorites);

module.exports = usersRoute;