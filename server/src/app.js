const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products/products.router");

const app = express();

app.use(cors({
    origin : "http://localhost:5173",
}));

app.use(express.json());

app.use(productsRouter);

module.exports = app;