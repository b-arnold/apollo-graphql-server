require('dotenv').config() // loads environment variables
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const router = require('./src/router');
const models = require('./src/models'); // loads graphql models
const { ApolloServer } = require('apollo-server-express'); // Apollo implementation of graphql server with express
const schema = require('./src/schema/schema');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false); 
const morgan = require('morgan');

const app = express();

// config for express-session
const sess = {
  secret: process.env.APP_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true
}

const server = new ApolloServer({
  schema,
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

// for applying middleware to server
server.applyMiddleware({
  app
});

if(app.get('env') === 'production') {
  sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

// setting app and passport session
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', router)

app.listen({ port: process.env.PORT }, () =>
  console.log(`Server ready at http://localhost:${process.env.PORT}`)
)

