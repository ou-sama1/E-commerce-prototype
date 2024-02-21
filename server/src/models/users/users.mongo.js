const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({

    username : {
        type : String,
        require : true,
    },

    email : {
        type : String,
        require : true,
        unique : true,
    },

    password : {
        type : String,
        require : true,
    },

    favorites : {
        type : [Number],
        require : false,
    }

});

module.exports = mongoose.model('User', usersSchema);