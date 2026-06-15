const express = require("express");

const router = express.Router();

const {
    addToCart,
    getCartItems,
    deleteCartItem,
    updateCartQuantity
} = require("../controllers/cartController");

router.post("/cart", addToCart);

router.get("/cart/:userId", getCartItems);

router.delete("/cart/:id", deleteCartItem);

router.put("/cart/:id", updateCartQuantity);

module.exports = router;
