const {Schema} = require('mongoose')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/myshopDB')
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));
// สร้าง Schema
const productSchema = new mongoose.Schema({
    french_fries: { type: Number, default: 0 },
    nugget: { type: Number, default: 0 },
    cost: { type: Number, required: true },
    profit: { type: Number, required: true },
    totalPrice: { type: Number },
    description: { type: String },
    createdAt: { type: Date, required: true } // เวลาที่ผู้ใช้กรอกเอง
});

// สร้าง Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
