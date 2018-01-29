const graphql = require('graphql');
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const UserType = require('./types/user_type');
const authService = require('../services/authService');
const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        signUp: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { name, email, password }, context) {
                console.log("1");
                console.log(Object.keys(context.request));
                console.log(context.request.headers);
                console.log("1")
                return User.findOne({ email: email }).then((existing) => {
                    if (!existing) {
                        console.log("2");
                        return bcrypt.hash(password, 10).then(hash => User.create({
                            name,
                            email,
                            password: password,
                        })).then((user) => {
                            console.log("4");
                            const { id } = user;

                            const token = jwt.sign({
                                id: user.id,
                                email: user.email
                            }, JWT_SECRET, { expiresIn: 60 * 60 });

                            context.request.user = Promise.resolve(token);
                            console.log(Object.keys(context.request));
                            console.log("User : " + JSON.stringify(context.request.user));
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
                console.log(context.request.user);
                return User.findOne({ email: email }).then((user) => {
                    if (user) {
                        // validate password
                        console.log("User : " + JSON.stringify(user));
                        console.log("password : " + password);

                        if (password == user.password) {

                            const token = jwt.sign({
                                id: user.id,
                                email: user.email
                            }, JWT_SECRET, { expiresIn: 60 * 60 });

                            context.request.user = Promise.resolve(token);

                            console.log(token);

                            console.log(context.request.user);

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
        }
    }
})

export default mutation;