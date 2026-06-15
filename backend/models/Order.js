const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

productId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Product",
required:true
},

quantity:{
type:Number,
default:1
},

address:{
type:String,
required:true
},

status:{
type:String,
default:"Pending"
},

createdAt:{
type:Date,
default:Date.now
},

deliveryDate:{

type:Date,

default:()=>{

const date =
new Date();

date.setDate(
date.getDate()+4
);

return date;

}

}

});

module.exports =
mongoose.model(
"Order",
orderSchema
);