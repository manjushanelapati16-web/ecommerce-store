const Product = require("../models/Product");

// GET PRODUCTS

const getProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// CREATE PRODUCT

const createProduct = async (req, res) => {
    try {

       
        const product = await Product.create({

        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        rating: req.body.rating,
        discount: req.body.discount,
        description: req.body.description,
        image: req.body.image

    });
            
  

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    getProducts,
    createProduct
};