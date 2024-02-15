const { getProducts } = require("../../models/products/products.model");

async function HttpGetProducts(req, res){
    res.status(200).json(await getProducts());
};

module.exports = {
    HttpGetProducts,
}