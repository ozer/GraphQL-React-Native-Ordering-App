import TimestampType from '../schema/helpers/TimestampType';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
moment.locale('tr');

const CartItemSchema = new Schema({
    cart : {
        type : Schema.Types.ObjectId,
        ref : 'cart'
    },
    product : {
        type : Schema.Types.ObjectId,
        ref : 'product'
    },
    created_at : { type : Date, default : moment() },
    quantity : Number
});

const CartSchema = new Schema({
    cartitems: [CartItemSchema],
    status : { type : String, default : 'active' },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
},{ timestamps : { createdAt : 'created_at', updatedAt : 'updated_at' }});

CartSchema.statics.addItem = function (cartId, productId, quantity) {
    console.log("CartSchema addItem : cartId : " + cartId);
    console.log("CartSchema addItem : item : " + productId);
    console.log("CartSchema addItem : quantity : " + quantity);
    const CartItem = mongoose.model('cartitem');
    return this.findById(cartId)
        .then(cart => {
            const cartitem = cart.cartitems.create({ quantity });
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

CartSchema.statics.findStockFromCarts = function (productId) {

    return this.aggregate([
        { "$unwind": "$cartitems" },
        { "$match": { "cartitems.product": mongoose.Types.ObjectId(productId) } },
        {
            "$group": {
                "_id": "$_id",
                "total": { "$sum": "$cartitems.quantity" }
            }
        }
    ])

}

CartSchema.statics.findItems = function (id) {

    console.log("Cart Schema : findItems : " + id);

    return this.findById(id)
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
mongoose.model('cartitem',CartItemSchema);
mongoose.model('cart', CartSchema);