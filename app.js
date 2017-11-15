// Load environment variables
require('dotenv').config();

// Require dependencies
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

// Require middleware
const flashMiddleware = require('./middleware/flash');

// Require routes
const index = require('./routes/index');
const login = require('./routes/login');
const signup = require('./routes/signup');

// Database stuff
const Database = require('./helpers/database');

// let db = new Database({});

// Configure the app
app.set('views', path.join(__dirname, 'app/views'));
app.engine('html', hbs({
  defaultLayout: 'master',
  extname: '.html',
  layoutsDir: 'app/views/layouts/',
  partialsDir: 'app/views/partials'
}));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(flashMiddleware());

app.use('/', index);
app.use('/login', login);
app.use('/signup', signup);

// Define path for static files
app.use('/', express.static(path.join(__dirname, 'app', 'assets')));

var graphqlHTTP = require('express-graphql');
var {buildSchema} = require('graphql');

var schema = buildSchema(`
  type Query{
    hello: String
  }
`);

var root = {
  hello: () => 'Hello World!'
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.all('*', (req, res) => res.render('404.html'));


// Start the app
app.listen(process.env.PORT, process.env.HOST, () => console.log("Listening on port " + process.env.PORT + ", " + new Date()));
