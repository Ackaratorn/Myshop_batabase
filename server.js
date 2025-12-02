const express = require('express')
const router = require('./Router/router')
const path = require('path')
const app = express()

app.set('views',path.join(__dirname,"views"))
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({ extended: true }));
app.use('/product',router)


app.listen(3000,()=>{
    console.log('start server inport localhost://3000/product')
})