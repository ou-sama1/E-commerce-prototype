const { getProducts, getProduct } = require("../../models/products/products.model");

async function HttpGetProducts(req, res){
    try{
        res.status(200).json(await getProducts());
    } catch(error){
        res.status(404).json({error : "an error occured"});
    }
};

async function HttpGetProduct(req, res){
    const id = req.params.id;
    try {
        const product = await getProduct(id)
        if(!product){
            throw product;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({error : 'invalid id'});
    }
};

module.exports = {
    HttpGetProducts,
    HttpGetProduct,
}