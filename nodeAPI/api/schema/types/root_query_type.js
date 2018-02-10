import mongoose, { Promise } from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
const graphql = require('graphql')
import UserType from './user_type';
import CategoryType from './category_type';
import ProductType from './product_type';
import CartType from './cart_type';
const User = mongoose.model('user');
const Product = mongoose.model('product');
const Category = mongoose.model('category');
const Cart = mongoose.model('cart');
import { getAuthenticatedUser } from '../../services/authService';
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            type: UserType,
            resolve(parentValue, { }, context) {

                console.log("Fetching user !");

                return context.user.then((data) => {

                    if (data) {


                        return User.findById(data.id).populate('cart').then(user => user);

                    }

                })



            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args, context) {

                //console.log("User : " + JSON.stringify(getAuthenticatedUser(context)))
                return User.find({});
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve(parentValue, { }, context) {
                console.log("categories being fetched !");

                context.user.then((data) => {
                    console.log("Data : " + JSON.stringify(data));
                }).catch((err) => {
                    console.log("Err occured due to the : " + err)
                })
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
            resolve(parentValue, { id }) {
                return Product.findById(id);
            }
        },
        cart: {
            type: CartType,
            resolve(_, { }, context) {

                console.log("Cart is being fetched from the root query : ");

                return context.user.then((data) => {

                    if (data) {

                        console.log("There we found the user !");

                        return User.findCart(data.id);

                    }

                })


            }
        }
    })
})

module.exports = RootQuery