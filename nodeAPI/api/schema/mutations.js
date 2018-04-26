import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import TimestampType from './helpers/TimestampType';
import { Promise } from 'mongoose';

const graphql = require('graphql');

const {
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt,
} = graphql;
const mongoose = require('mongoose');

const User = mongoose.model('user');
const Category = mongoose.model('category');
const Product = mongoose.model('product');
const Cart = mongoose.model('cart');
const UserType = require('./types/user_type');
const CartType = require('./types/cart_type');
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
        return User.findOne({ email }).then((existing) => {
          if (!existing) {
            console.log('Not Existing');
            return bcrypt.hash(password, 10).then(hash => User.create({
              name,
              email,
              password,
            })).then((user) => {
              console.log('user got it');
              const { id, email } = user;
              console.log(user);
              const token = jwt.sign({
                id,
                email,
              }, JWT_SECRET, { expiresIn: 60 * 60 * 24 });
              user.jwt = token;
              context.user = user;
              console.log(`token : ${token}`);
              console.log(`user : ${user}`);
              return user;
            });
          }
          console.log('3');
          return Promise.reject('email already exists !');
        });
      },
    },
    signIn: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, { email, password }, context) {
        console.log(`email : ${email}`);
        // console.log(context.user);
        return User.findOne({ email }).populate('cart').populate('cartitems').populate('product')
          .then((user) => {
            if (user) {
              // validate password
              // console.log("User : " + JSON.stringify(user));
              console.log(`password : ${password}`);

              if (user.cart == null) {
                console.log('Cart is null !');

                User.createCart(user.id);
              }

              if (password == user.password) {
                console.log('Successfull login!');

                // Lets generate a token for the authenticated user !
                const token = jwt.sign({
                  id: user.id,
                  email: user.email,
                }, JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 * 52 });

                user.jwt = token;
                context.request.user = user;
                console.log(`user : ${user}`);
                return user;
              }

              console.log('Bad login');

              Promise.reject('Passwords incorrect !');
            }
            console.log('User not found !');
            return Promise.reject('email not found');
          });
      },
    },
    newCategory: {
      type: CategoryType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parentValue, { name }, context) {
        return Category.findOne({ name }).then((existing) => {
          console.log(`Context : ${context.request}`);
          console.log(Object.keys(context));
          console.log(Object.keys(context.request));
          console.log(context.request.user);

          if (!existing) {
            console.log('Category does not exist !');

            return new Category({ name }).save();
          }
          return Promise.reject('Category already exists !');
        });
      },
    },
    newProduct: {
      type: CategoryType,
      args: {
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
        categoryId: { type: GraphQLID },
      },
      resolve(parentValue, {
        name, price, quantity, categoryId,
      }, context) {
        return Product.findOne({ name }).then((existing) => {
          if (!existing) {
            console.log('Product does not exist !');

            return Category.addProduct(name, price, quantity, categoryId);
          }

          return Promise.reject('Product already exists !');
        });
      },
    },
    fillCart: {
      type: UserType,
      args: {
        productId: { type: GraphQLID },
        quantity: { type: GraphQLString },
      },
      resolve(_, { productId, quantity }, context) {
        console.log('Here we will add some item to the cart!');

        console.log(`Quantity : ${quantity}`);
        console.log(`ProductId : ${productId}`);

        return context.user.then((data) => {
          console.log(`Data : ${JSON.stringify(data)}`);

          if (data) {
            return User.findCart(data.id)
              .then((cart) => {
                console.log(`Users cart : ${cart}`);

                if (cart) {
                  console.log('Yeay, there we found an active cart belongs the User !');

                  console.log(`Cart id inside the error : ${cart.id}`);

                  return Cart.addItem(cart.id, productId, quantity)
                    .then((updatedCart) => {
                      console.log(`Updated cart : ${updatedCart}`);

                      return Product.updateInventory(productId, cart.id, quantity)
                        .then((updatedInventory) => {
                          console.log(`Updated inventory : ${JSON.stringify(updatedInventory)}`);

                          return Promise.resolve('Item has been added to the cart successfully !');
                        }).catch((updatedInventoryErr) => {
                          console.log(`Update inventory failed due to the error : ${updatedInventoryErr}`);
                        });
                    }).catch((updatedCartErr) => {
                      console.log(`Updated Cart Err : ${updatedCartErr}`);
                    });
                }

                console.log('The user does not have active cart !');

                return User.createCart(data.id).then((newCart) => {
                  console.log(`New cart : ${newCart.cart}`);

                  return Cart.addItem(newCart.cart, productId, quantity)
                    .then((updatedCart) => {
                      console.log(`Updated cart : ${updatedCart}`);

                      return Product.updateInventory(productId, newCart.cart, quantity)
                        .then((updateInventory) => {
                          console.log(`Update Inventory ! ${JSON.stringify(updateInventory)}`);

                          return Promise.resolve('Item has been added to the cart successfully !');
                        }).catch((updateInventoryErr) => {
                          console.log(`Update inventory failed due to the error : ${updateInventoryErr}`);
                        });
                    }).catch((updatedCartErr) => {
                      console.log(`Updated cart error : ${updatedCartErr}`);
                    });
                }).catch((newCartErr) => {
                  console.log(`New cart error : ${newCartErr}`);
                });
              }).catch((cartErr) => {
                console.log(`Error occured while finding the cart due to the following : ${cartErr}`);

                return Promise.reject('Err occured, check the logs !');
              });
          }

          console.log('Authentication problem occured');

          return Promise.reject('Error occured, check the logs !');
        }).catch((err) => {
          console.log(`Err occured due to the : ${err}`);

          return Promise.reject('Error occured, check the logs !');
        });
      },
    },
    addItemToCart: {
      type: UserType,
      args: {
        productId: { type: GraphQLString },
        quantity: { type: GraphQLString },
      },
      resolve: (_, { productId, quantity }, context) => {
        console.log('It worked !');

        console.log(`Quantity : ${quantity}`);
        console.log(`ProductId : ${productId}`);

        return context.user.then((data) => {
          if (data) {
            return User.findCart(data.id).then((cart) => {
              // Check whether the user has an active cart or not.
              if (cart) {
                console.log('Yeay, there we found an active cart belongs the User !');

                console.log(`Cart id inside the error : ${cart.id}`);

                return Cart.addItem(cart.id, productId, quantity)
                  .then((updatedCart) => {
                    console.log(`Updated cart : ${updatedCart}`);

                    return Promise.resolve(data);

                  }).catch((updatedCartErr) => {
                    console.log(`Updated Cart Err : ${updatedCartErr}`);
                  });
              }
              // Well, it seems that the user does not have a cart actively.
              console.log('The user does not have active cart !');

              return User.createCart(data.id).then((newCart) => {
                console.log(`New cart : ${newCart.cart}`);

                return Cart.addItem(newCart.cart, productId, quantity)
                  .then((updatedCart) => {
                    console.log(`Updated cart : ${updatedCart}`);

                    return Product.updateInventory(productId, newCart.cart, quantity)
                      .then((updateInventory) => {
                        console.log(`Update Inventory ! ${JSON.stringify(updateInventory)}`);

                        return Promise.resolve('Item has been added to the cart successfully !');
                      }).catch((updateInventoryErr) => {
                        console.log(`Update inventory failed due to the error : ${updateInventoryErr}`);
                      });
                  }).catch((updatedCartErr) => {
                    console.log(`Updated cart error : ${updatedCartErr}`);
                  });
              }).catch((newCartErr) => {
                console.log(`New cart error : ${newCartErr}`);
              });
            }).catch((err) => {
              console.log(`Error occured at finding the cart of the user due to the : ${err}`);

              const findingCartErr = 'User`s cart was not found !';

              return Promise.reject(findingCartErr);
            });
          }

          console.log('Authentication problem occured');

          const authErrMessage = 'Authentication problem occured';

          return Promise.reject(authErrMessage);
        }).catch(err => Promise.reject(err));
      },
    },
    testCart: {
      type: ProductType,
      args: {
        quantity: { type: GraphQLString },
        productId: { type: GraphQLID },
      },
      resolve(_, { quantity, productId }, context) {
        console.log(`Quantity : ${quantity}`);
        console.log(`ProductId : ${productId}`);
        console.log('testCart Mutation !');

        return true;
      },
    },
  },

});

export default mutation;
