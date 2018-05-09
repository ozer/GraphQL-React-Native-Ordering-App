const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const moment = require('moment');

moment.locale('tr');

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  created_at: { type: Date, default: new Date() },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'cart',
  },
}, { collection: 'User' });


UserSchema.statics.findCart = function (id) {
  console.log(`Finding the cart UserId : ${id}`);

  return this.findById(id, { $and: [{ updated_at: { $gte: moment().subtract(5, 'hours') } }] })
    .populate('cart')
    .then((user) => { console.log(user.cart); return user.cart; });
};

UserSchema.statics.createCart = function (id) {
  console.log(`Creating cart : ${id}`);

  const Cart = mongoose.model('cart');

  return this.findById(id)
    .then((user) => {
      const cart = new Cart();
      user.cart = cart.id;
      return Promise.all([
        cart.save(), user.save(),
      ]).then(([cart, user]) => user);
    });
};

/*

CategorySchema.statics.addProduct = function(name,price,quantity,id){
    const Product = mongoose.model('product');
    return this.findById(id)
        .then(category => {
            const product = new Product({category,name,price,quantity});
            category.products.push(product.id);
            return Promise.all([
                product.save(),category.save()
            ]).then(([product,category])=>category);
        })
}

CategorySchema.statics.findProducts = function (id) {
    return this.findById(id)
        .populate('products')
        .then(category => category.products);
}

*/

// UserSchema.index({ expires : 10 })

mongoose.model('user', UserSchema, 'User');
