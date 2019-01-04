import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import mongoose from 'mongoose';

import UserType from './UserType';

const User = mongoose.model('user');

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // returns all users in db
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return User.find({});
            }
        },
        // returns specific user in db
        user: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve (parentValue, { id }) {
                return User.findById(id);
            }
        }
    }
});

export default RootQuery;