var connect = require('connect')
var http = require('http')
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'khmerio_db'
});

var app = connect();

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");  
} else {
    console.log("Error connecting database ... \n\n");  
}
});

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())

// respond to all requests
app.use(function(req, res){
  res.end('Hello from Connect!\n');
})

app.use("/",function(req,res){
connection.query('SELECT * from khmerio_tb_user AS email', function(err, rows, fields) {
connection.end();
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
  });
});

app.use("/api/user/add", function(req, res) {
	console.log(req.body.user_id);
	var post  = {
			user_id: 'saysotheara', 
			first_name: 'Sotheara', 
			last_name: 'Say', 
			email: 'khmerbridge@gmail.com', 
			password: '',
			addr: 'Phnom Phnom',
			phone: '012342532',
			active: 'off',
			photo: ''
		};
	var query = connection.query('INSERT INTO khmerio_tb_user SET ?', req.body.user_id, function(err, result) {
  		if (!err) {
    		console.log('The solution is: ', result);
  		}
  		else {
    		console.log('Error while performing Query.');
  		}
	});
	console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
});

app.use('/test', function(req, res) {
    res.status(200).json({'test': 'it works!'});
})

//create node.js http server and listen on port
http.createServer(app).listen(3000);
