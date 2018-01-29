const graphql =  require('graphql')
const { GraphQLObjectType,GraphQLString,GraphQLID } = graphql;


const UserType = new GraphQLObjectType({
    name : 'UserType',
    fields : {
        name : {
            type : GraphQLString
        },
        email : {
            type : GraphQLString
        },
        id : {
            type : GraphQLID
        },
    }
});

module.exports = UserType;