const mysql = require("mysql")

var connction = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: 'mydb'
  }); 

module.exports = connction    