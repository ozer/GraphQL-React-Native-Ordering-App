import RootQuery from './types/root_query_type';
import mutation from './mutations';

const graphql = require('graphql');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
