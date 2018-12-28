const {
    GraphQLSchema 
} = require('graphql');

const query = require('./types/RootQueryType')
const mutation = require('./mutations');

// creating graphql schema describing the
// functionality available to the front-end client
const schema = new GraphQLSchema({
    query,
    mutation
});

module.exports = schema;