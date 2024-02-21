const jwt = require('jsonwebtoken');

async function requireAuth(req, res, next){
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({error : 'user not authenticated.'});
    }
    const token = authorization.split(' ')[1];

    try {
        const {_id} = jwt.verify(token, process.env.TOKEN_SECRET);
        req.body._id = _id;
        next();
    } catch (error) {
        res.status(401).json({error : "user not authenticated."});
    }
}

module.exports = {
    requireAuth,
}