const express = require('express');
const app = express();
const path = require('path');


app.get('/', (req, res) => res.render('./index.html'));

app.use(express.static(path.join(__dirname, 'app')));
app.listen(3000, (port) => console.log("Listening on port " + port));
