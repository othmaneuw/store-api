require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const productsRoutes = require('./routes/products');
const connectDB = require("./db/connect");

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

//Middleware
app.use(express.json());

//Routes
app.get('/',(req,res)=>{
    res.send('<h1>Products API</h1><a href="#">Products</a>');
})

//Products Route

app.use('/api/products',productsRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () =>{
    try {
        //Connect to DB
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>console.log(`Listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();