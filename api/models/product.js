const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    category : {
        type : Schema.Types.ObjectId,
        ref : 'category'
    },
    name : String,
    price : Number,
    quantity : Number,
    created_at : { type : Date, default : new Date()},
})



mongoose.model('product',ProductSchema);