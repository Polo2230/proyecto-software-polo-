const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    productPhoto:{
        type:String,
    },
    priceWithDiscount:{
        type:Number,
    },
    stock:{
        type:Number,
        required:true
    },
    category: {
        type:String
    }
},{
    timestamps: true
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
