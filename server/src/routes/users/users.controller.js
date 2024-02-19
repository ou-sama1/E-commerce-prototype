const { signup, login } = require('../../models/users/users.model');
const jwt = require('jsonwebtoken');

function createToken(id){
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn : "120s" });
}

async function httpSignup(req, res){
    const { username, email, password } = req.body;

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

module.exports = {
    httpSignup,
    httpLogin
}