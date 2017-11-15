// This file contains the routes for the signup page - /login

var router = require('express').Router();
const Database = require('../helpers/database');
let db = new Database({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

router.route('/')
  .get((req, res) => res.render('signup.html', {
    flash: res.locals.flash,
    currentURL: req.headers.referer
  }))
  .post((req, res) => {
    console.log(req.body);

    db.add('people', ['first_name', 'last_name', 'email', 'password', 'phone', 'about'], [req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.phone, req.body.bio]);



    res.redirect(req.body.redirectURL);
  })
  ;

module.exports = router;
