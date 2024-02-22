const { signup, login, addToFavorites, getFavorites } = require('../../models/users/users.model');
const jwt = require('jsonwebtoken');

function createToken(id){
    return jwt.sign({ _id : id }, process.env.TOKEN_SECRET, { expiresIn : "3d" });
}

async function httpSignup(req, res){
    const { username, email, password } = req.body.user;

    try {
        const user = await signup(username, email, password);
        //Create a token
        const token = createToken(user._id);
        res.status(201).json({ username, email, token });
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

async function httpLogin(req, res){
    const { email, password } = req.body;

    try {
        const user = await login(email, password);
        //Create a token
        const token = createToken(user._id);
        res.status(200).json({ username : user.username, email, token });
    } catch (error) {
        res.status(400).json({error : error.message});
    }

}

async function httpGetFavorites(req, res){
    const { _id } = req.body;

    try{
        const favorites = await getFavorites(_id);
        res.status(200).json(favorites);
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

async function httpAddToFavorites(req, res){
    const { _id, id } = req.body;

    try {
        await addToFavorites(_id, id);
        res.status(201).json({success : true});
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

module.exports = {
    httpSignup,
    httpLogin,
    httpAddToFavorites,
    httpGetFavorites,
}