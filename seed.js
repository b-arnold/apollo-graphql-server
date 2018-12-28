require('dotenv').config()
const mongoose = require('mongoose');
const faker = require('faker');
const models = require('./src/models');
const User = mongoose.model('user');

async function userSeeder() {
    createUserPromises = [];
    await User.deleteMany({});

    const users = [];
    for(i = 0; i < 50; i++) {
        users.push({
            email: faker.internet.email(),
            password: faker.internet.password(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
        })
    }

    users.forEach(user => {
        createUserPromises.push(User.create(user));
    })

    return Promise.all(createUserPromises);
}

async function initSeed() {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true });

    console.log('***** seeding database...')

    await userSeeder();

    mongoose.connection.close(() => {
        console.log("");
        console.log("Seeding complete.")
    })

}

initSeed();
