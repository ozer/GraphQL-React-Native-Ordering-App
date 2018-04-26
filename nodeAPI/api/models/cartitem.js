import TimestampType from '../schema/helpers/TimestampType';

const moment = require('moment');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
moment.locale('tr');

const CartItemSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'cart',
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
  },
  created_at: { type: Date, default: moment() },
  quantity: Number,
});


// mongoose.model('cartitem',CartItemSchema);
