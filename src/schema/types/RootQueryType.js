const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');
const mongoose = require('mongoose');

const UserType = require('./UserType');
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

module.exports = RootQuery;