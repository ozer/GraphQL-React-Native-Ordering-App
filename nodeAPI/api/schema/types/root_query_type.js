import mongoose, { Promise } from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import UserType from './user_type';
import CategoryType from './category_type';
import ProductType from './product_type';
import CartType from './cart_type';
import { getAuthenticatedUser } from '../../services/authService';

const graphql = require('graphql');

const User = mongoose.model('user');
const Product = mongoose.model('product');
const Category = mongoose.model('category');
const Cart = mongoose.model('cart');
const {
  GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      resolve(parentValue, { }, context) {
        console.log('Fetching user !');

        return context.user.then((data) => {
          if (data) {
            return User.findById(data.id).populate('cart').then(user => user);
          }
        });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args, context) {
        // console.log("User : " + JSON.stringify(getAuthenticatedUser(context)))
        return User.find({});
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parentValue, { }, context) {
        console.log('categories being fetched !');

        return context.user.then((data) => {
          return Category.find({});
        }).catch((err) => {
          console.log(`Err occured due to the : ${err}`);
        });
      },
    },
    category: {
      type: CategoryType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Category.findById(id);
      },
    },
    product: {
      type: ProductType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Product.findById(id);
      },
    },
    cart: {
      type: CartType,
      resolve(_, { }, context) {
        console.log('Cart is being fetched from the root query : ');
        return context.user.then((data) => {
          if (data) {
            console.log('There we found the user !');
            return User.findCart(data.id);
          }
        });
      },
    },
  }),
});

module.exports = RootQuery;
