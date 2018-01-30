import TimestampType from '../schema/helpers/TimestampType';
const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
moment.locale('tr');

const ProductSchema = new Schema({
    category : {
        type : Schema.Types.ObjectId,
        ref : 'category'
    },
    name : {type : String},
    price : { type : Number},
    quantity : { type : Number},
    created_at: { type: Date, default : moment() },
})

mongoose.model('product',ProductSchema);
