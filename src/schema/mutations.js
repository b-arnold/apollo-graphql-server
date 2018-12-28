const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = require('graphql')
const mongoose = require('mongoose');

const UserType = require('./types/UserType');
const User = mongoose.model('user');

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString }
            },
            resolve(parentValue, { email, password, firstName, lastName }) {
                return (new User({ email, password, firstName, lastName })).save()
            }
        }
    }
})

module.exports = mutation;