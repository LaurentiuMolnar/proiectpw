// Load environment variables
require('dotenv').config();

// Require dependencies
const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const hbs = require('express-handlebars');

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

app.get('/', (req, res) => res.render('index.html'));

// Define path for static files
app.use('/', express.static(path.join(__dirname, 'app', 'assets')));

// Start the app
app.listen(process.env.PORT, process.env.HOST, () => console.log("Listening on port " + process.env.PORT + ", " + new Date()));
