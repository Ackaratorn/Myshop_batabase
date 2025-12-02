const express = require('express');
const router = express.Router();
const Product = require('../Models/productSchema');

// Show add form and list
router.get('/add', async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('add', { products });
});

// Add product
router.post('/add', async (req, res) => {
    const { french_fries, nugget, cost, profit, saleTime, description } = req.body;
    const product = new Product({
        french_fries: Number(french_fries),
        nugget: Number(nugget),
        cost: Number(cost),
        profit: Number(profit),
        description,
        createdAt: new Date(saleTime)
    });
    await product.save();
    res.redirect('/product/add');
});

// Edit form
router.get('/edit/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('edit', { product });
});

// Update product
router.post('/edit/:id', async (req, res) => {
    const { french_fries, nugget, cost, profit, saleTime, description } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
        french_fries: Number(french_fries),
        nugget: Number(nugget),
        cost: Number(cost),
        profit: Number(profit),
        description,
        createdAt: new Date(saleTime)
    });
    res.redirect('/product/add');
});

// Delete product
router.get('/delete/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/product/add');
});

module.exports = router;
