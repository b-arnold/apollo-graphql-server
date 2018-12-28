require('dotenv').config() // loads environment variables
const express = require('express'); 
const models = require('./src/models'); // loads graphql models
const { ApolloServer } = require('apollo-server-express'); // Apollo implementation of graphql server with express
const schema = require('./src/schema/schema');
const mongoose = require('mongoose'); 
const morgan = require('morgan');

const app = express();

const server = new ApolloServer({
  schema
});

// Error handling for when mongo uri is not specified
if(!process.env.MONGO_URI) {
  throw new Error('You must provide a MongoDB URI')
}

// connecting to the mongo database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection
  .once('open', () => console.log('Connected to MongoDB.'))
  .on('error', error => console.log('Error connecting to MongoDB:', error ));

// TODO: mount authentication middleware

// for applying middleware to server
server.applyMiddleware({
  app
});

app.use(morgan('combined'));

app.listen({ port: process.env.PORT }, () =>
  console.log(`Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
)
