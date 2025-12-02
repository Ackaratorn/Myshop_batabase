const express = require('express');
const router = express.Router();
const Product = require('../models/productSchema');

// แสดงหน้า form พร้อมรายการสินค้า
router.get('/add', async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('add', { products });
});

// รับข้อมูลจาก form (Create)
router.post('/add', async (req, res) => {
    const { french_fries, nugget, cost, profit, description, saleTime } = req.body;
    const totalPrice = Number(french_fries)*109 + Number(nugget)*115;

    try {
        const newProduct = new Product({
            french_fries: Number(french_fries),
            nugget: Number(nugget),
            cost: Number(cost),
            profit: Number(profit),
            totalPrice,
            description,
            createdAt: new Date(saleTime)
        });

        await newProduct.save();
        res.redirect('/product/add');
    } catch (err) {
        console.log(err);
        res.send("เกิดข้อผิดพลาด!");
    }
});

// แสดงหน้าแก้ไข
router.get('/edit/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.send("ไม่พบข้อมูล");
    res.render('edit', { product });
});

// อัพเดทข้อมูล (Update)
router.post('/edit/:id', async (req, res) => {
    const { french_fries, nugget, cost, profit, description, saleTime } = req.body;
    const totalPrice = Number(french_fries)*109 + Number(nugget)*115;

    try {
        await Product.findByIdAndUpdate(req.params.id, {
            french_fries: Number(french_fries),
            nugget: Number(nugget),
            cost: Number(cost),
            profit: Number(profit),
            totalPrice,
            description,
            createdAt: new Date(saleTime)
        });
        res.redirect('/product/add');
    } catch (err) {
        console.log(err);
        res.send("เกิดข้อผิดพลาดในการแก้ไข!");
    }
});

// ลบข้อมูล (Delete)
router.get('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/product/add');
    } catch (err) {
        console.log(err);
        res.send("เกิดข้อผิดพลาดในการลบ!");
    }
});

module.exports = router;
