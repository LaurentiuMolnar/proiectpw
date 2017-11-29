// This file contains the routes for the index page - /

var router = require('express').Router();
const Database = require('../helpers/database');
let db = new Database({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


router.get('/', (req, res) => {
    db._connection.query("SELECT * FROM projects", (err, results, fields) => {
      if(err) console.log(err);
      res.render('index.html', {
        flash: res.locals.flash,
        // data: JSON.stringify(results)
        data:results
      });
    });

  });
router.get('/international', (req, res) => {
//  console.log(req.params);
    db._connection.query("SELECT * FROM projects WHERE type='international'", (err, results, fields) => {
      if(err) console.log(err);
      res.render('index.html', {
        flash: res.locals.flash,
        // data: JSON.stringify(results)
        data: results
      });
    });
  })
  ;
  router.get('/national', (req, res) => {
  //  console.log(req.params);
      db._connection.query("SELECT * FROM projects WHERE type='national'", (err, results, fields) => {
        if(err) console.log(err);
        res.render('index.html', {
          flash: res.locals.flash,
          // data: JSON.stringify(results)
          data: results
        });
      });
    })
    ;
router.get('/local', (req, res) => {
//  console.log(req.params);
    db._connection.query("SELECT * FROM projects WHERE type='local'", (err, results, fields) => {
      if(err) console.log(err);
      // console.log(results);
      if(results.length == 0) results[0] = {name: "Nu exista proiecte in aceasta categorie"};
      res.render('index.html', {
        flash: res.locals.flash,
        // data: JSON.stringify(results)
        data: results
      });
    });
  })
  ;
module.exports = router;
