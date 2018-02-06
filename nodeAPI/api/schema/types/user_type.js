import TimestampType from '../helpers/TimestampType';
import CartType from './cart_type';
const graphql =  require('graphql')
const mongoose = require('mongoose');
const User = mongoose.model('user');
const { GraphQLObjectType,GraphQLString,GraphQLID,GraphQLDate } = graphql;


const UserType = new GraphQLObjectType({
    name : 'UserType',
    fields : {
        name : {
            type : GraphQLString
        },
        email : {
            type : GraphQLString
        },
        password : {
            type : GraphQLString
        },
        id : {
            type : GraphQLID
        },
        jwt : {
            type : GraphQLString
        },
        cart : {
            type : CartType,
            resolve(parentValue){
                console.log("cart cart");
                console.log("User id : "+parentValue.id);
                return User.findCart(parentValue.id);
            }
        }
    }
});

module.exports = UserType;