import TimestampType from '../schema/helpers/TimestampType';

const mongoose = require('mongoose');

const { Schema } = mongoose;
const moment = require('moment');

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

const CartSchema = new Schema({
  cartitems: [CartItemSchema],
  status: { type: String, default: 'active' },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Class Methods
CartSchema.statics.addItem = function (cartId, productId, quantity) {
  console.log(`CartSchema addItem : cartId : ${cartId}`);
  console.log(`CartSchema addItem : item : ${productId}`);
  console.log(`CartSchema addItem : quantity : ${quantity}`);
  return this.findById(cartId)
    .then((cart) => {
      const cartitem = cart.cartitems.create({ quantity });
      cartitem.product = productId;
      console.log(`CartSchema addItem : cartItem : ${cartitem}`);
      console.log(`CartSchema addItem : cartItem.id ${cartitem.id}`);
      cart.cartitems.push(cartitem);
      console.log(`CartSchema addItem : cart total : ${cart}`);
      return Promise.all([
        cart.save(),
      ]).then(([cart]) => cart);
    });
};

CartSchema.statics.findStockFromCarts = function (productId) {
  return this.aggregate([
    { $unwind: '$cartitems' },
    { $match: { 'cartitems.product': mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: '$_id',
        total: { $sum: '$cartitems.quantity' },
      },
    },
  ]);
};

CartSchema.statics.findItems = function (id) {
  console.log(`Cart Schema : findItems : ${id}`);

  return this.findById(id)
    .then(cart => cart.cartitems);
};

// Instance Methods

// Checks the given item exists in the cart or not !
CartSchema.methods.findItemInCart = function (itemId) {
  console.log(`The cart : ${this.id}`);
  return mongoose.model('cart').findById(mongoose.Types.ObjectId(this.id))
    .then((cart) => {
      const { cartitems } = cart;
      const search = cartitems.find(obj => obj.product == itemId);
      if (search) {
        return search;
      }
      return false;
    });
};

CartSchema.methods.getQuantityOfTheItem = function (itemId) {
  console.log(`The cart : ${this.id}`);
  return mongoose.model('cart').findById(mongoose.Types.ObjectId(this.id))
    .then((cart) => {
      const { cartitems } = cart;
      const search = cartitems.find(obj => obj.product == itemId);
      console.log(`Quantity : ${search.quantity}`);
      console.log(search);
      if (search) {
        return search.quantity;
      }
      return false;
    });
};


CartSchema.methods.addQuantity = async function (itemId) {
  console.log(`We will increase the quantity(${1}) of the product has the id : ${itemId}`);
  return mongoose.model('cart').update({ _id: mongoose.Types.ObjectId(this.id), 'cartitems.product': mongoose.Types.ObjectId(itemId) }, { $inc: { 'cartitems.$.quantity': 1 } }, { new: true })
    .then(updatedQuantity => updatedQuantity).catch((err) => {
      console.log(`Err occured at adding quantity due to the following : ${err.message}`);
      return err;
    });
};

CartSchema.methods.decreaseQuantity = async function (itemId) {
  console.log(`We will decrease the quantity(${1}) of the product has the id : ${itemId}`);

  return mongoose.model('cart').update({ _id: mongoose.Types.ObjectId(this.id), 'cartitems.product': mongoose.Types.ObjectId(itemId) }, { $inc: { 'cartitems.$.quantity': -1 } }, { new: true })
    .then(updatedQuantity => updatedQuantity).catch((err) => {
      console.log(`Err occured at adding quantity due to the following : ${err.message}`);
      return err;
    });
};

CartSchema.methods.removeItemFromCart = async function (itemId) {
  console.log(`We will remove the item by the id : ${itemId} from the cart.`);
  return mongoose.model('cart').update({ _id: mongoose.Types.ObjectId(this.id) }, { $pull: { cartitems: { product: itemId } } })
    .then(updatedCart => updatedCart)
    .catch(err => err);
};

mongoose.model('cartitem', CartItemSchema);
mongoose.model('cart', CartSchema);
