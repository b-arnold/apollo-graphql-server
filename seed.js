import 'dotenv/config'; // loads environment variables
import mongoose from 'mongoose';
import faker from 'faker'; // library used for fake data

import models from './src/models'; // loads graphql models

const User = mongoose.model('user');

async function userSeeder() {
    createUserPromises = [];
    await User.deleteMany({}); // removes all current users in db

    // creates new users for db
    const users = [];
    for(i = 0; i < 50; i++) {
        users.push({
            email: faker.internet.email(),
            password: faker.internet.password(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
        })
    }

    // creates/pushes users using User model
    users.forEach(user => {
        createUserPromises.push(User.create(user));
    })

    // returns a promise that all users will be created
    return Promise.all(createUserPromises);
}

async function initSeed() {
    // connects to mongo db
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true });

    console.log('***** seeding database...')

    await userSeeder(); // waits until all users have been created into db

    // closes out of db
    mongoose.connection.close(() => {
        console.log("");
        console.log("Seeding complete.")
    })

}

initSeed();
