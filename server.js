// git rm --cache -r node_module
//git remote -v shows all remote branches
//git diff
//Heroku open git push heroku master

//var request = require('request');
var express = require('express');
var app = express();
var PORT=process.env.PORT || 3000;  //Heroku gives port
var middleware=require('./middleware.js');
//app.use(middleware.requireAuthentication);

// Comment '/' all of it ? to go to index static file directly
app.get('/about',middleware.requireAuthentication,function(req,res){
	res.send('yourguide.me');
});

app.use(express.static(__dirname + '/Public'));



app.listen(PORT,function(){
	console.log('express started on port '+PORT);
});