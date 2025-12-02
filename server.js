const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = require('./Router/router');
require('dotenv').config();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/product', router);

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/product');
});
