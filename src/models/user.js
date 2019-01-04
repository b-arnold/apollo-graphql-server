import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// schema used for mongo db
const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String }
});

UserSchema.statics.updateUser = function(params) {
    const User = mongoose.model('user');

    return User.findById(params.id).then(user => {
        
        user.firstName = params.firstName || user.firstName;
        user.lastName = params.lastName || user.lastName;
        user.email = params.email || user.email;

        return user.save()
    });
}

mongoose.model('user', UserSchema);
