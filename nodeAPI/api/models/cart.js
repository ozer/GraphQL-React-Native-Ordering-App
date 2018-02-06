import TimestampType from '../schema/helpers/TimestampType';
const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
moment.locale('tr');

const CartSchema = new Schema({
    created_at: { type: Date, default: moment() },
    updated_at: { type: Date, default: moment(), expires: 15 },
    cartitems: [{
        type: Schema.Types.ObjectId,
        ref : 'cartitem'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
});

/*
CartSchema.pre('save', (next) => {
    this.updated_at = moment();
    done();
})
*/

CartSchema.statics.addItem = function (cartId, productId, quantity) {
    console.log("CartSchema addItem : cartId : " + cartId);
    console.log("CartSchema addItem : item : " + productId);
    console.log("CartSchema addItem : quantity : " + quantity);
    const CartItem = mongoose.model('cartitem');
    return this.findById(cartId)
        .then(cart => {
            const cartitem = new CartItem({ quantity });
            cartitem.product = productId;
            console.log("CartSchema addItem : cartItem : " + cartitem);
            console.log("CartSchema addItem : cartItem.id " + cartitem.id)
            cart.cartitems.push(cartitem);
            console.log("CartSchema addItem : cart total : " + cart)
            return Promise.all([
                cart.save()
            ]).then(([cart]) => cart);
        })
};

CartSchema.statics.findStockFromCarts = function(productId){

    return this.aggregate([
        {$unwind : '$cartitems'},
        {
            $group : {
                _id : null,
                total : {
                    $sum : "$cartitems.quantity"
                }
            }
        }
    ])

}

CartSchema.statics.findItems = function (id) {

    console.log("Cart Schema : findItems : " + id);

    return this.findById(id)
        .populate('cartitems')
        .then(cart => cart.cartitems);
}

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


*/

mongoose.model('cart', CartSchema);