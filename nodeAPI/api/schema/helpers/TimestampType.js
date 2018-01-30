const Kind = require('graphql/language');
const graphql = require('graphql');

const {
    GraphQLScalarType
} = graphql;

function serializeDate(value) {

    console.log("serializeDate");
    if (value instanceof Date) {
      return value.getTime();
    } else if (typeof value === 'number') {
      return Math.trunc(value);
    } else if (typeof value === 'string') {
      return Date.parse(value);
    }
    return null;
  }
  
  function parseDate(value) {

    console.log("parseDate");
    if (value === null) {
      return null;
    }
  
    try {
      return new Date(value);
    } catch (err) {
      return null;
    }
  }
  
  function parseDateFromLiteral(ast) {

    console.log("parseDateFromLiteral")
    if (ast.kind === Kind.INT) {
      const num = parseInt(ast.value, 10);
      return new Date(num);
    } else if (ast.kind === Kind.STRING) {
      return parseDate(ast.value);
    }
    return null;
  }

  const TimestampType = new GraphQLScalarType({
    name: 'Timestamp',
    description:
      'The javascript `Date` as integer.',
    serialize: serializeDate,
    parseValue: parseDate,
    parseLiteral: parseDateFromLiteral,
  });
  
  export default TimestampType;