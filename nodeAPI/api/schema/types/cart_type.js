import TimestampType from '../helpers/TimestampType';
import CartItemType from './cart_item_type';
const mongoose = require('mongoose');
const Cart = mongoose.model('cart');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLDate, GraphQLInt, GraphQLList } = graphql;

const CartType = new GraphQLObjectType({
    name : 'CartType',
    fields : () => ({
        id: {
            type: GraphQLID
        },
        created_at: {
            type: TimestampType
        },
        updated_at: {
            type: TimestampType
        },
        cartitems : {
            type : new GraphQLList(CartItemType),
            resolve(parentValue){

                console.log("Cart is finding its items !");

                console.log("Parent value id of Cart Type : "+parentValue.id)

                return Cart.findItems(parentValue.id);
            }
        }
    })
})

module.exports = CartType;