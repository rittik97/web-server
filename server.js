var express = require('express');
var app = express();

var middleware=require('./middleware.js');
//app.use(middleware.requireAuthentication);

// Comment '/' to go to index static file directly
app.get('/',middleware.requireAuthentication,function(req,res){
	res.send('Hola !');
});

app.use(express.static(__dirname + '/Public'));



app.listen(3000,function(){
	console.log('express started on port 3000');
});