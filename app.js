// Load environment variables
require('dotenv').config();

// Require dependencies
const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

// Require middleware
const flashMiddleware = require('./middleware/flash')();

// Require routes
const index = require('./routes/index');
const login = require('./routes/login');

// Connect to the database
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if(err) {
    console.error('Error connecting: ' + err.stack);
    flash.on = true;
    flash.message = "Error connecting to the database. Please try again later";
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

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

app.use(flashMiddleware);
// app.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// })

app.use('/', index);
app.use('/login', login);
app.all('*', (req, res) => res.render('404.html'));

// Define path for static files
app.use('/', express.static(path.join(__dirname, 'app', 'assets')));

// Start the app
app.listen(process.env.PORT, process.env.HOST, () => console.log("Listening on port " + process.env.PORT + ", " + new Date()));
