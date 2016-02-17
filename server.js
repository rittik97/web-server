// git rm --cache -r node_module

//git remote -v
//git diff

var express = require('express');
var app = express();
var PORT=process.env.PORT || 3000;
var middleware=require('./middleware.js');
//app.use(middleware.requireAuthentication);

// Comment '/' to go to index static file directly
app.get('/',middleware.requireAuthentication,function(req,res){
	res.send('Hola !');
});

app.use(express.static(__dirname + '/Public'));



app.listen(PORT,function(){
	console.log('express started on port '+PORT);
});