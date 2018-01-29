import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
const  graphql = require('graphql')
import UserType from './user_type';
const User = mongoose.model('user');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : () => ({
        user : {
            type : UserType,
            resolve (parentValue,args, context){
                console.log(Object.keys(context.request))
                return context.request.user;
            }
        },
        users : {
            type : new GraphQLList(UserType),
            resolve(parentValue,args,context) {
                console.log(Object.keys(context.request));
                console.log("asdsads"+JSON.stringify(context.request.user))
                return User.find({});
              }   
        }
    })
})

module.exports = RootQuery