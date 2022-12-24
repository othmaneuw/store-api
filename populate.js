require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('./models/product');
const jsonProducts = require('./products.json');
const connectDB = require('./db/connect');

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log("SUCCESS!!!!");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();