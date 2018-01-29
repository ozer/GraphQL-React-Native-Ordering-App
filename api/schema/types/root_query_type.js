import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
const graphql = require('graphql')
import UserType from './user_type';
import CategoryType from './category_type';
const User = mongoose.model('user');
const Category = mongoose.model('category');
import {  getAuthenticatedUser } from '../../services/authService';
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
            resolve() {
                return Category.find({});
            }
        }
    })
})

module.exports = RootQuery