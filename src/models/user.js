const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model used for mongo db
const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String }
});

mongoose.model('user', UserSchema);
