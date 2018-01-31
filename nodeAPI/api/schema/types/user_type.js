import TimestampType from '../helpers/TimestampType';

const graphql =  require('graphql')
const { GraphQLObjectType,GraphQLString,GraphQLID,GraphQLDate } = graphql;


const UserType = new GraphQLObjectType({
    name : 'UserType',
    fields : {
        name : {
            type : GraphQLString
        },
        email : {
            type : GraphQLString
        },
        password : {
            type : GraphQLString
        },
        id : {
            type : GraphQLID
        },
        jwt : {
            type : GraphQLString
        }
    }
});

module.exports = UserType;