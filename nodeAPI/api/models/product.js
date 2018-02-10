import TimestampType from '../schema/helpers/TimestampType';
import { now } from 'moment';
const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
moment.locale('tr');

const ProductSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    created_at: { type: Date, default: moment() },
    carted: [
        {
            quantity: { type: Number },
            cart_id: { type: Schema.Types.ObjectId },
            created_at: { type: Date, default: moment() }
        }
    ]
})

ProductSchema.statics.updateInventory = function (id, cart_id, quantity) {

    return this.findOneAndUpdate({
        '_id': mongoose.Types.ObjectId(id), 'quantity': { $gte: quantity }
    },
        {
            '$inc': {
                'quantity' : -quantity
            },
            '$push' : {
                'carted' : {' quantity' : quantity, 'cart_id' : cart_id }
            }
        })

}

mongoose.model('product', ProductSchema);
