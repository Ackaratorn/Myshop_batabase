const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    french_fries: { type: Number, default: 0 },
    nugget: { type: Number, default: 0 },
    cost: { type: Number, required: true },
    profit: { type: Number, required: true },
    totalPrice: { type: Number },
    description: { type: String },
    createdAt: { type: Date, required: true }
});

productSchema.pre('save', function(next) {
    this.totalPrice = (this.french_fries * 109) + (this.nugget * 115);
    next();
});

module.exports = mongoose.model('Product', productSchema);
