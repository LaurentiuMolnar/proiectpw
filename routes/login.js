// This file contains the routes for the index page - /login

var router = require('express').Router();

router.route('/')
  .get((req, res) => res.render('login.html', {
    flash: res.locals.flash,
    currentURL: req.headers.referer
  }))
  .post((req, res) => {
    console.log(req.body);
    res.redirect(req.body.redirectURL);
  })
  ;

module.exports = router;
