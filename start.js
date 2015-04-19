var express    = require("express");
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var connection = mysql.createConnection({
 	host     : 'localhost',
  	user     : 'root',
  	password : '',
  	database : 'khmerio_db'
});

var app = express();

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");  
} else {
    console.log("Error connecting database ... \n\n");  
}
});

// create application/json parser 
var jsonParser = bodyParser.json();

app.get("/",function(req,res){
	connection.query('SELECT * from khmerio_tb_user', function(err, rows, fields) {
		if (!err) {
    		console.log('The solution is: ', rows);
		}
		else {
    		console.log('Error while performing Query.');
		}
  	});
});

app.get("/api/location",function(req,res){
	connection.query('SELECT location_id, location from khmerio_tb_location ORDER BY location_id DESC', function(err, rows, fields) {
  		if (!err) {
    		res.status(200).json(rows);
    		console.log('The solution is: ', rows);  			
  		}
  		else {  			
    		console.log('Error while performing Query.');
  		}
  	});
});

app.post("/api/user/add", jsonParser, function(req, res) {
	var data = req.body;
	var post  = {
			user_id		: data.user_id, 
			first_name	: data.first_name, 
			last_name	: data.last_name, 
			email		: data.email, 
			password	: data.password,
			addr		: data.addr,
			phone		: data.phone,
			active		: data.active,
			photo		: data.photo
	};
	var query = connection.query('INSERT INTO khmerio_tb_user SET ?', post, function(err, result) {
  		if (!err) {
    		console.log('The solution is: ', result);
  		}
  		else {
    		console.log('Error while performing Query.');
  		}
	});
	console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
});

app.post("/api/post/add", jsonParser, function(req, res) {
	var data = req.body;
	var post  = {
			user_id		: data.user_id, 
			first_name	: data.first_name, 
			last_name	: data.last_name, 
			email		: data.email, 
			password	: data.password,
			addr		: data.addr,
			phone		: data.phone,
			active		: data.active,
			photo		: data.photo
	};
	var query = connection.query('INSERT INTO khmerio_tb_user SET ?', post, function(err, result) {
  		if (!err) {
    		console.log('The solution is: ', result);
  		}
  		else {
    		console.log('Error while performing Query.');
  		}
	});
	console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
});


app.get('/test', function(req, res) {
    res.status(200).json({'test': 'it works!'});
})


app.listen(3000);

