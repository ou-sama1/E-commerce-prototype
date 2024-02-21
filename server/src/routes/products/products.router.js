const express = require("express");
const { HttpGetProducts, HttpGetProduct } = require("./products.controller");

const productsRouter = express.Router();

productsRouter.get('/products', HttpGetProducts);
productsRouter.get('/products/:id', HttpGetProduct);

module.exports = productsRouter;