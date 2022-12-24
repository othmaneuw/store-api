

const getAllProducts = (req,res)=>{
    //throw new Error('error testing ...');
    res.send('All products');
}

const getAllProductsStatic = (req,res)=>{
    res.send('All products static');
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}