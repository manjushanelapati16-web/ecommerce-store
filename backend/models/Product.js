const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    brand:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    rating:{
        type:Number,
        default:4
    },

    discount:{
        type:Number,
        default:0
    },

    description:{
        type:String,
        default:""
    },

    image:{
        type:String,
        default:""
    }

});

module.exports = mongoose.model("Product", productSchema);