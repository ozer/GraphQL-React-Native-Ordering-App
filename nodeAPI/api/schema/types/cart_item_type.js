import TimestampType from '../helpers/TimestampType';
const mongoose = require('mongoose');
const CartItem = mongoose.model('cartitem');
const Product = mongoose.model('product');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLDate, GraphQLInt } = graphql;

const CartItemType = new GraphQLObjectType({
    name: 'CartItemType',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        quantity: {
            type: GraphQLInt
        },
        created_at: {
            type: TimestampType
        },
        product : {
            type : require('./product_type'),
            resolve(parentValue){
                console.log("Finding product cart item type : "+parentValue);
                return Product.findById(parentValue.product).then(product=>product)
            }
        },
        cart: {
            type: require('./cart_type'),
            resolve(parentValue) {
                return CartItem.findById(parentValue).populate('cart').
                    then(cartItem => {
                        console.log("cart item : " + cartItem);
                        return cartItem.cart
                    })
            }
        }
    })
})

module.exports = CartItemType;