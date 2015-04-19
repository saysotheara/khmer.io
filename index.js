

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
var routes = require('./routes')(app);
http.listen(3000, function() {
    console.log('listening on *:3000');
});


module.exports = function(app) {
app.post('/api/user/add', function(request, response) {
console.log(request.body);
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({value:"somevalue"}));
});
}