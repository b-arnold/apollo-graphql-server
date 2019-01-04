import { GraphQLSchema } from 'graphql';
import query from './types/RootQueryType';
import mutation from './mutations';

// creating graphql schema describing the
// functionality available to the front-end client
const schema = new GraphQLSchema({
    query,
    mutation
});

export default schema;