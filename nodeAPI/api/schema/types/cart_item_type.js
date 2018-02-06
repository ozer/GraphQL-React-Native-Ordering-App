import TimestampType from '../helpers/TimestampType';
const mongoose = require('mongoose');
const CartItem = mongoose.model('cartitem');
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
            type : GraphQLID
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