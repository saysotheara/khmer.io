var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

connection.connect();

connection.query('SELECT email FROM khmerio_db.khmerio_tb_user AS email', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].email);
});

connection.end();