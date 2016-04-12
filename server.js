// git rm --cache -r node_module
//git remote -v shows all remote branches
//git diff
//Heroku open git push heroku master

//var request = require('request');
var express = require('express');
var bodyParser     =        require("body-parser");
var app = express();
var PORT=process.env.PORT || 3000;  //Heroku gives port
var middleware=require('./middleware.js');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(middleware.requireAuthentication);
//app.get('/uber',funtion(req,res){});
/*
var url='https://api.uber.com/v1/estimates/price?server_token=f1nvxqcW3F031byA9PQv-a_3BaHFG_uj1WK-lo-I&start_latitude=40.798496&start_longitude=-73.964578&end_latitude=40.807552&end_longitude=-73.962573';

request({
		url: url,
		json: true
	}, function (error, response, body) {
		if (error) {
			console.log('Unable to fetch weather.');
		} else {
			console.log(body);
		}
	});
*/
// Comment '/' all of it ? to go to index static file directly
app.get('/about',middleware.requireAuthentication,function(req,res){
	res.send('yourguide.me');
});

app.post('/tryme',function(req,res){
	res.send(req.body.Sw);
});

app.use(express.static(__dirname + '/Public'));



app.listen(PORT,function(){
	console.log('express started on port '+PORT);
});