const {
    GraphQLNonNull, 
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
        // adding a new user into the db
        addUser: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString }
            },
            resolve(parentValue, params) {
                return (new User(params)).save()
                    .catch(err => new Error(err));
            }
        },
        // updating a user's information
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString }
            },
            resolve(parentValue, params) {
                return User.updateUser(params)
                    .catch(err => new Error(err));
            }
        },
        // delete a user in db
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parentValue, params) {
                return User.findByIdAndRemove(params.id).exec()
                    .catch(err => new Error(err));
            }
        }
    }
})

module.exports = mutation;