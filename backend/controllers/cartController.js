const Cart = require("../models/Cart");

// ADD TO CART

const addToCart = async (req, res) => {


try {

    const existingItem = await Cart.findOne({
        userId: req.body.userId,
        productId: req.body.productId
    });

    if (existingItem) {

        existingItem.quantity += 1;

        await existingItem.save();

        return res.json(existingItem);

    }

    const cartItem = await Cart.create(req.body);

    res.status(201).json(cartItem);

} catch (error) {

    res.status(500).json({
        message: error.message
    });

}


};

// GET CART ITEMS

const getCartItems = async (req, res) => {


try {

    const cartItems = await Cart.find({
    userId: req.params.userId
}).populate("productId");

    res.json(cartItems);

} catch (error) {

    res.status(500).json({
        message: error.message
    });

}


};

// DELETE CART ITEM

const deleteCartItem = async (req, res) => {


try {

    await Cart.findByIdAndDelete(req.params.id);

    res.json({
        message: "Cart Item Removed"
    });

} catch (error) {

    res.status(500).json({
        message: error.message
    });

}


};

// UPDATE CART QUANTITY

const updateCartQuantity = async (req, res) => {


try {

    const cartItem = await Cart.findByIdAndUpdate(

        req.params.id,

        {
            quantity: req.body.quantity
        },

        {
          
    returnDocument:"after"

        }

    );

    res.json(cartItem);

} catch (error) {

    res.status(500).json({
        message: error.message
    });

}


};

module.exports = {
addToCart,
getCartItems,
deleteCartItem,
updateCartQuantity
};
