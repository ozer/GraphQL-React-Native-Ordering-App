import mongoose, { Promise } from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
const graphql = require('graphql')
import UserType from './user_type';
import CategoryType from './category_type';
import ProductType from './product_type';
const User = mongoose.model('user');
const Product = mongoose.model('product');
const Category = mongoose.model('category');
import { getAuthenticatedUser } from '../../services/authService';
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            type: UserType,
            resolve(parentValue, args, context) {
                console.log(Object.keys(context.request))
                return context.request.user;
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args, context) {
                //console.log(context.user.schema)
                console.log("User : " + JSON.stringify(getAuthenticatedUser(context)))
                return User.find({});
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve(parentValue,{},context) {

                return Category.find({});
                /*
                if( context.request.user ){
                    console.log("ok !")
                    return Category.find({});
                } else {
                    console.log("not ok !");
                    return Promise.reject('You are not authorized !');
                }
                */
                
            }
        },
        category: {
            type: CategoryType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Category.findById(id);
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parnetValue, { id }) {
                return Product.findById(id);
            }
        }
    })
})

module.exports = RootQuery