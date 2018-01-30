import TimestampType from '../helpers/TimestampType';
const mongoose = require('mongoose');
const Product = mongoose.model('product');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLDate, GraphQLInt } = graphql;

const ProductType = new GraphQLObjectType({
    name: 'ProductType',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString,
        },
        price: {
            type: GraphQLInt
        },
        quantity: {
            type: GraphQLInt
        },
        created_at: {
            type: TimestampType
        },
        category: {
            type: require('./category_type'),
            resolve(parentValue) {
                console.log("Parent value  : " + JSON.stringify(parentValue))
                return Product.findById(parentValue).populate('category').
                    then(product => {
                        console.log("product : " + product);
                        return product.category
                    })
            }
        },
    })
})

module.exports = ProductType;