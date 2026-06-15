const express = require("express");

const router = express.Router();

const {
    createOrder,
    getOrders,
    cancelOrder
} = require("../controllers/orderController");

router.post("/orders", createOrder);

router.get("/orders/:userId", getOrders);
router.delete("/orders/:id",cancelOrder);


module.exports = router;