const express = require("express");
const { HttpGetProducts } = require("./products.controller");

const productsRouter = express.Router();

productsRouter.get('/products', HttpGetProducts);

module.exports = productsRouter;