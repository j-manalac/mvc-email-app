// contains only product routes

const express = require('express');
const router = express.Router();

// note that product.js is in the models folder
// server.js is in the root, so need to indicate that in the same folder
// but this is no longer in the root
// to access something outside, need to backtrack twice hence .. 
// instead of .
const productModel = require('../models/product');

// notice removed /product/list and changed to just /list

// show all products
router.get('/list', function (req, res) {
    res.render('products/productList', {
        title: "Product Listing Page",
        products: productModel.getAllProducts()
    });
});

// show add product form
router.get('/add', function (req, res) {
    res.render('products/productAdd', {
        title: "Product Add Form"
    });
});

// when user submits form
router.post('/add', (req, res) => {

});

module.exports = router;