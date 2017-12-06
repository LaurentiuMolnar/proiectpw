require('dotenv').config();
const bcrypt = require('bcrypt');
const cors = require('cors');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DB_HOST='127.0.0.1',
  user: process.env.DB_USER='root',
  password: process.env.DB_PASS='',
  database: process.env.DB_NAME='pw'
});
connection.connect();
connection.on('connect', (err) => {
  console.log(`Connected successfully`);
});
connection.on('error', (err) => {
  console.error(err);
  connection.connect();
});

const restify = require('restify');

var server = restify.createServer();

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(cors());

// Handle requests to API root --> /

server.get('/', function(req, res, next){
  res.status(403);
  res.sendRaw("<h1>Error 403: Forbidden</h1>");
  next();
});
server.post('/', (req, res, next) => {
  res.status(403);
  res.sendRaw("<h1>Error 403: Forbidden</h1>");
  next();
});

// Handle login requests --> /auth
server.post('/auth', (req, res, next) => {
  var query = `
    SELECT * FROM people WHERE email = '${req.body.email}'
  `;

  connection.query(query, (err, results, fields) => {
    if(err){
      console.log(err);
      res.status(404);
      res.sendRaw('<h1>Error 404: Resource Not Found</h1>');
      return;
    }
    res.status(200);
    if(bcrypt.compareSync(req.body.password, results[0].password_hash)) {
      res.json((results.map(item => {delete item.password_hash; return item;}))[0]);
    } else res.json(null);
    next();
  });

});

// Handle requests to people database --> /users
server.get('/users', (req, res, next) => {
  connection.query("SELECT * FROM people", (err, results, fields) => {
    if(err) {
      res.status(404);
      res.sendRaw('<h1>Error 404: Resource Not Found</h1>');
      return;
    }
    res.status(200);
    res.json(results);
    next();
  });
});
server.get('/users/:id', (req, res, next) => {
  connection.query(`SELECT * FROM people WHERE id=${req.params.id}`, (err, results, fields) => {
    if(err) {
      res.status(404);
      res.sendRaw('<h1>Error 404: Resource Not Found</h1>');
    }
    res.status(200);
    res.json(results[0]);
    next();
  });
});

server.post('/users', (req, res, next) => {
  let hash = bcrypt.hashSync(req.body.password, 5);
  hash = hash.toString();
  var query = `
    INSERT INTO people (organization_id, first_name, last_name, email, password_hash, phone, about, image)
    VALUES (${Number.parseInt(req.body.organization_id)}, '${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${hash}', '${req.body.phone}', '${req.body.about}', ${req.body.image})
    `;
  // console.log(query);
  connection.query(query, (err, results, fields) => {
      if(err) {
        console.log(err);
        res.status(404);
        res.sendRaw('<h1>Error 404: Resource Not Found</h1>');
        return;
      }
      res.status(201);
      res.json(true);
      next();
    });
});
server.post('/users/:id', (req, res, next) => {
  let hash = bcrypt.hashSync(req.body.password, 5);
  hash = hash.toString();
  var query = `
    INSERT INTO people (organization_id, first_name, last_name, email, password_hash, phone, about, image)
    VALUES (${Number.parseInt(req.body.organization_id)}, '${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${hash}', '${req.body.phone}', '${req.body.about}', ${req.body.image})
    `;
  // console.log(query);
  connection.query(query, (err, results, fields) => {
      if(err) {
        console.log(err);
        res.status(404);
        res.sendRaw('<h1>Error 404: Resource Not Found</h1>');
        return;
      }
      res.status(201);
      res.json(true);
      next();
    });
});

// Handle requests to projects table --> /projects
server.get('/projects', (req, res, next) => {
  let query = `
    SELECT * FROM projects
  `;
  connection.query(query, (err, results, fields) => {
    if(err){
      console.log(err);
      res.status(404);
      res.sendRaw('<h1>Error 404: Resource Not Found</h1>');
      return;
    }
    res.status(200);
    res.json(results);
    next();
  });
});
server.get('/projects/:id', (req, res, next) => {
  let query = `
    SELECT * FROM projects
    WHERE id=${req.params.id}
    LIMIT 1
  `;
  connection.query(query, (err, results, fields) => {
    if(err){
      console.log(err);
      res.status(404);
      res.sendRaw('<h1>Error 404: Resource Not Found</h1>');
      return;
    }
    res.status(200);
    res.json(results[0]);
    next();
  });
});

server.post('/projects', (req, res, next) => {
  let query = `
    INSERT INTO projects (name, organization_id, date, description, type, image)
    VALUES ('${req.body.name}', ${req.body.organization_id}, '${req.body.date}', '${req.body.description}', '${req.body.type}', ${req.body.image})
  `;
  connection.query(query, (err, results, fields) => {
    if(err) {
      console.log(err);
      res.status(404);
      res.sendRaw('<h1>Resource not found</h1>');
      return;
    }
    res.status(201);
    res.json(true);
    next();
  });
});
server.post('/projects/:id', (req, res, next) => {
  let query = `
    INSERT INTO projects (name, organization_id, date, description, type, image)
    VALUES ('${req.body.name}', ${req.body.organization_id}, ${new Date(req.body.date)}, '${req.body.description}', '${req.body.type}', ${req.body.image})
  `;
  connection.query(query, (err, results, fields) => {
    if(err) {
      console.log(err);
      res.status(404);
      res.sendRaw('<h1>Resource not found</h1>');
      return;
    }
    res.status(201);
    res.json(true);
    next();
  });
});

server.listen(process.env.PORT, process.env.HOST, () => console.log('%s listening at %s', server.name, server.url));
