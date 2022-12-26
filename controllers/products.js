const Product = require('../models/product');

const getAllProducts = async (req,res)=>{
    //throw new Error('error testing ...');
    console.log(req.query);
    const {featured,company,name} = req.query;
    const queryObject = {};
    if(featured){
        queryObject.featured = featured === "true" ? true : false;
    }
    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = {$regex : name , $options : 'i'};
    }
    const products = await Product.find(queryObject);
    res.status(200).json({products , nbHits : products.length});
}

const getAllProductsStatic = (req,res)=>{
    res.send('All products static');
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}