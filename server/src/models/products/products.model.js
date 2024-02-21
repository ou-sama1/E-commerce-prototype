const productsDB = require('./products.mongo');

async function getProducts(){
    return await productsDB.find({}, {
        '_id' : 0,
        '__v' : 0,
    }).sort('id');
}

async function getProduct(id){
    const validatedId = parseInt(id);
    if(!(validatedId >= 0)){
        throw new Error('invalid id');
    }
    return await productsDB.findOne({ id }, {
        '_id' : 0,
        '__v' : 0,
    });
}

async function getCategories(){
    const categories = await productsDB.find({}, {
        'category' : 1,
        '_id' : 0,
    })
    const distinctCategories = new Set(categories.map(obj => obj.category))
    return Array.from(distinctCategories)
}

async function getLatestId(){
    return await productsDB.findOne({}, {
        'id' : 1,
        '_id' : 0,
    }).sort('-id')
}

async function saveProduct(product){
    if(product.image && product.title && product.description && product.price && product.category && product.gender){
        const {image, title, description, price, category, gender} = product;
        if(price > 0 && (gender === 'male' || gender === 'female')){
            await productsDB.insert({
                id : await getLatestId() + 1,
                image, 
                title, 
                description, 
                price, 
                category, 
                gender
            });
        }
        
    }
}

module.exports = {
    getProducts,
    getProduct,
}