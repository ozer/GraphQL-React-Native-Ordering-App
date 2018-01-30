const graphql = require('graphql');
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import TimestampType from './helpers/TimestampType';
import { Promise } from 'mongoose';
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Category = mongoose.model('category');
const Product = mongoose.model('product');
const UserType = require('./types/user_type');
const CategoryType = require('./types/category_type');
const ProductType = require('./types/product_type');
const authService = require('../services/authService');
const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        signUp: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parentValue, { name, email, password }, context) {

                return User.findOne({ email: email }).then((existing) => {
                    if (!existing) {
                        console.log("Not Existing");
                        return bcrypt.hash(password, 10).then(hash => User.create({
                            name,
                            email,
                            password: password,
                        })).then((user) => {
                            console.log("user got it");
                            const { id, email } = user;
                            console.log(user);
                            const token = jwt.sign({
                                id: id,
                                email: email
                            }, JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                            context.user = Promise.resolve(token);
                            console.log("Token : " + token);
                            return user;
                        })
                    }
                    console.log("3");
                    return Promise.reject('email already exists !');
                })
            }
        },
        signIn: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, context) {
                console.log("email : " + email);
                console.log(context.user);
                return User.findOne({ email: email }).then((user) => {
                    if (user) {
                        // validate password
                        console.log("User : " + JSON.stringify(user));
                        console.log("password : " + password);

                        if (password == user.password) {

                            const token = jwt.sign({
                                id: user.id,
                                email: user.email
                            }, JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                            context.user = Promise.resolve(token);
                            console.log("token : " + token);

                            return user;

                        } else {

                            Promise.reject('Passwords incorrect !');

                        }

                        /*
                        return bcrypt.compare(password, user.password).then((res) => {
                            if (res) {
                                // create jwt
                                const token = jwt.sign({
                                    id: user.id,
                                    email: user.email,
                                }, JWT_SECRET);
                                user.jwt = token;
                                context.request.user = Promise.resolve(user);
                                return user;
                            }

                            return Promise.reject('password incorrect');
                        });
                        */
                    }
                    console.log("User not found !");
                    return Promise.reject('email not found');
                });
            }
        },
        test: {
            type: UserType,
            resolve(parentValue, { }, context) {
                console.log("selam")
                console.log("asdsads" + Object.keys(context.request))
                return 'selam';
            }
        },
        newCategory: {
            type: CategoryType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parentValue, { name }, context) {

                return Category.findOne({ name }).then((existing) => {

                    console.log("Context : " + context.request);
                    console.log(Object.keys(context));
                    console.log(Object.keys(context.request));
                    console.log(context.request.user)

                    if (!existing) {

                        console.log("Category does not exist !");

                        return new Category({ name }).save();
                    }
                    return Promise.reject('Category already exists !');

                })

            }
        },
        newProduct: {
            type: CategoryType,
            args: {
                name: { type: GraphQLString },
                price: { type: GraphQLInt },
                quantity: { type: GraphQLInt },
                categoryId: { type: GraphQLID },
            },
            resolve(parentValue, { name, price, quantity, categoryId }, context) {

                return Product.findOne({ name }).then((existing) => {

                    if (!existing) {

                        console.log("Product does not exist !");

                        return Category.addProduct(name, price, quantity, categoryId);

                    }

                    return Promise.reject('Product already exists !');

                })

            }
        }
    }

})

/*

{
	"query" : " query {users{id name email created_at}}"
}

*/

export default mutation;