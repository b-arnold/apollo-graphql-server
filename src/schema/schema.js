const {
    GraphQLSchema 
} = require('graphql');

const query = require('./types/RootQueryType')
const mutation = require('./mutations');

const schema = new GraphQLSchema({
    query,
    mutation
});

module.exports = schema;