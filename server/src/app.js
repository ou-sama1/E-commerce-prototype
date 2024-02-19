const express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const productsRouter = require("./routes/products/products.router");
const usersRouter = require("./routes/users/users.router");

const app = express();

app.use(helmet());

app.use(cors({
    origin : "http://localhost:5173",
}));

app.use(express.json());

app.use(productsRouter);
app.use(usersRouter);

module.exports = app;