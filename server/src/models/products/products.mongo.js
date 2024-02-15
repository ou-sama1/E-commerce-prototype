const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    id : {
        type : Number,
        require : true,
    },

    image : {
        type : String,
        require : true,
    },

    title : {
        type : String,
        require : true,
    },

    description : {
        type : String,
        require : true,
    },

    price : {
        type : Number,
        require : true,
    },

    category : {
        type : String,
        require : true,
    },

    gender : {
        type : String,
        require : true,
    }
})

module.exports = mongoose.model('Product', productsSchema);