const mysql = require('mysql');
require('dotenv').config();

let flash = {};
var connection = {};

//function initialize(options) {
module.exports = class {
//  let _connection = {};

  constructor(options) {
    this._connection = mysql.createConnection(options);
    this._connection.connect((err) => {
      if(err) {
        console.error('Error connecting: ' + err.stack);
        flash.on = true;
        flash.message = "Error connecting to the database. Please try again later";
        return;
      }
      console.log('Connected as id ' + this._connection.threadId);
    });

    return this;
  }


  add(table, fields, values){
    let fieldList = fields.map((el) => '`' + el + '`').join(', ');
    let valueList = values.map((el) => mysql.escape(el)).join(', ');
    var sql = `INSERT INTO ?? ?? VALUES ?`;

    this._connection.query(`INSERT INTO ${table} (${fieldList}) VALUES (${valueList})`, (error, results, fields) => {
      if(error) {
        console.log(error.stack);
        return;
      }

      console.log(results);

    });
  }
}

module.exports.flash = flash;
// module.exports = initialize;
