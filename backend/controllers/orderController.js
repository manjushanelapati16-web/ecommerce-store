const Order = require("../models/Order");

// CREATE ORDER

const createOrder = async (req,res)=>{

try{

const order =
await Order.create({

userId:
req.body.userId,

productId:
req.body.productId,

quantity:
req.body.quantity,

address:
req.body.address,

status:
"Pending"

});

res.status(201).json(order);

}

catch(error){

res.status(500).json({

message:
error.message

});

}

};

// GET ALL ORDERS

const getOrders = async (req,res) => {

    try {

       const orders = await Order.find({
    userId: req.params.userId
}).populate("productId");
        res.json(orders);

    } catch(error) {

        res.status(500).json({
            message:error.message
        });

    }

};



const cancelOrder = async (req,res)=>{

try{

await Order.findByIdAndDelete(

req.params.id

);

res.json({

message:

"Order Cancelled"

});

}

catch(error){

res.status(500).json({

message:

error.message

});

}

};



module.exports = {
    createOrder,
    getOrders,
    cancelOrder
};