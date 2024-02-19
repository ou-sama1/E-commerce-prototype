const UsersDB = require('./users.mongo');
const bcrypt = require('bcrypt');

function validate(username, email, password){
    //Validating using regex
    return /^[a-zA-Z]{2,}[0-9]*$/.test(username) && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
}

async function signup(username, email, password){
    //Validating the inputs again before inserting to database
    if(!validate(username, email, password)){
        throw Error('Invalid inputs.');
    }
    //Validating whether the email already registered in our database
    const exists = await UsersDB.findOne({email});
    if(exists){

        throw Error('Email already exists');
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
        throw Error('All fields must be filled');
    }

    const user = await UsersDB.findOne({email});
    if(!user){
        throw Error('Incorrect email.');
    }   

    const validPass = await bcrypt.compare(password, user.password);
    if(!validPass){
        throw Error('Incorrect password.');
    }
    return user;
}

module.exports = {
    signup,
    login,
}