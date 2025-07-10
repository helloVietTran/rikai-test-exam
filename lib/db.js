const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'rikai_test_exam'
});
connection.connect(err => {
  if (err) console.error('Connection error:', err);
  else console.log('DB connected');
});
module.exports = connection;
