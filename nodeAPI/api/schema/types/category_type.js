import TimestampType from '../helpers/TimestampType';
import ProductType from './product_type';
const mongoose = require('mongoose');
const Category = mongoose.model('category');
const Product = mongoose.model('product');
const graphql =  require('graphql')
const { GraphQLObjectType,GraphQLString,GraphQLID,GraphQLDate,GraphQLInt,GraphQLList } = graphql;

const CategoryType = new GraphQLObjectType({
    name : 'CategoryType',
    fields : () => ({
        name : {
            type : GraphQLString,
        },
        created_at : {
            type : TimestampType
        },
        id: { type: GraphQLID },
        products : {
            type : new GraphQLList(ProductType),
            resolve(parentValue){
                return Category.findProducts(parentValue.id);
            }
        }
    })
})

module.exports = CategoryType;