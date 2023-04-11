const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'teste',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'db'
});

connection.connect();

exports.connection = connection;