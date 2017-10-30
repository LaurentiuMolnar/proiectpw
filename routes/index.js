// This file contains the routes for the index page - /

var router = require('express').Router();

router.route('/')
  .get((req, res) => res.render('index.html', {
    flash: res.locals.flash
  }))
  ;

module.exports = router;
