const Product = require('../models/product');

const getAllProducts = async (req,res)=>{
    //throw new Error('error testing ...');
    console.log(req.query);
    const {featured,company,name,sort,fields} = req.query;
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
    let result =  Product.find(queryObject);
    if(sort){
        let sortedList = sort.split(',').join(' ');
        result = result.sort(sortedList);
    }else result = result.sort("createdAt");
    if(fields){
        let fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page - 1) * limit;
    
    result= result.skip(skip).limit(limit);
    //find , limit , skip , select , sort
    const products = await result;
    
    res.status(200).json({products , nbHits : products.length});
}

const getAllProductsStatic = (req,res)=>{
    res.send('All products static');
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}