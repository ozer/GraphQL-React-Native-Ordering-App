import TimestampType from '../schema/helpers/TimestampType';

const moment = require('moment');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
moment.locale('tr');

const CategorySchema = new Schema({
  name: { type: String },
  created_at: { type: Date, default: moment() },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'product',
  }],
});

CategorySchema.statics.addProduct = function (name, price, quantity, id) {
  const Product = mongoose.model('product');
  return this.findById(id)
    .then((category) => {
      const product = new Product({
        category, name, price, quantity,
      });
      category.products.push(product.id);
      return Promise.all([
        product.save(), category.save(),
      ]).then(([product, category]) => category);
    });
};

CategorySchema.statics.findProducts = function (id) {
  console.log('Mongodb is looking for products !');
  return this.findById(id)
    .populate('products')
    .then(category => category.products);
};

mongoose.model('category', CategorySchema);
