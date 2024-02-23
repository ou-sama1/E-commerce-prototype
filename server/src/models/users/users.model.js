const UsersDB = require('./users.mongo');
const ProductsDB = require('../products/products.mongo');
const bcrypt = require('bcrypt');

function validate(username, email, password){
    //Validating using regex
    return /^[a-zA-Z]{2,}[0-9]*$/.test(username) && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
}

async function signup(username, email, password){
    //Validating the inputs again before inserting to database
    if(!validate(username, email, password)){
        throw new Error('Invalid inputs.');
    }
    //Validating whether the email already registered in our database
    const exists = await UsersDB.findOne({email});
    if(exists){

        throw new Error('Email already exists');
    }
    //Hashing the password before inserting it to database
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //Inserting into database
    const user = await UsersDB.create({
        username,
        email,
        password : hash,
    })

    return user
}

async function login(email, password){
    if(!email || !password){
        throw new Error('All fields must be filled');
    }

    const user = await UsersDB.findOne({email});
    if(!user){
        throw new Error('Incorrect email.');
    }   

    const validPass = await bcrypt.compare(password, user.password);
    if(!validPass){
        throw new Error('Incorrect password.');
    }
    return user;
}

async function getFavorites(_id){
    const user = await UsersDB.findOne({ _id },{
        _id : 0,
       favorites : 1,
    });
    const userFavorites = user.favorites;
    if(!userFavorites){
        return false; 
    }
    const favorites = await ProductsDB.find({
        id : { $in : userFavorites }
    }, {
        _id : 0,
        id : 1,
        image : 1,
        title : 1,
    })
    return favorites;
}

//This function is not only for adding to favorites, it also removes if the item was already added
async function addToFavorites(_id, id){
    const validatedId = parseInt(id);

    //Checking if the id is valid
    if(!(validatedId >= 0)){
        throw Error('invalid id');
    }
    //Checking if that product exists 
    const existsInProducts = await ProductsDB.findOne({id : validatedId});
    if(!existsInProducts){
        throw Error('Item not found');
    }
    //Checking if the product is already added to favorites, if so, then remove it
    const existsInFavorites = await UsersDB.findOne({_id, favorites : validatedId});
    if(existsInFavorites){
        await UsersDB.updateOne({_id}, {
            $pull : { favorites : validatedId }
        })
        return 'removed';
    }
    await UsersDB.updateOne({_id},{
        $push : { favorites : validatedId }
    }, {
        upsert : true,
    }
    )
    return 'added';
}

module.exports = {
    signup,
    login,
    addToFavorites,
    getFavorites,
}