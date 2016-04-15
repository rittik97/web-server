// git rm --cache -r node_module
//git remote -v shows all remote branches
//git diff
//Heroku open git push heroku master

//  40.761418, -73.977679             40.757582, -73.984159

var request = require('request');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var PORT=process.env.PORT || 3000;  //Heroku gives port
var middleware=require('./middleware.js');
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
var returnmessage;
//app.use(middleware.requireAuthentication);
//app.get('/uber',funtion(req,res){});
/*
*/
// Comment '/' all of it ? to go to index static file directly


/*
var url='https://api.uber.com/v1/estimates/price?server_token=f1nvxqcW3F031byA9PQv-a_3BaHFG_uj1WK-lo-I&start_latitude=40.798496&start_longitude=-73.964578&end_latitude=40.807552&end_longitude=-73.962573';
	var ubermesage;

	request({
			url: url,
			json: true
		}, function (error, response, body) {
			if (error) {
				console.log('Unable to fetch weather.');
			} else {
				ubermesage = body;
				var ubertype1 = ubermesage.prices[0].display_name;
				var price1 = ubermesage.prices[0].estimate;
				var ubertype2 = ubermesage.prices[1].display_name;
				var price2 = ubermesage.prices[1].estimate;
				console.log("I can call you an "+ubertype1+" which will cost "+price1);
				
			}
		});

*/



var x={ '{"start_latitude":"40.6874279","start_longitude":"-73.9717465","end_latitude":"40.6846622","end_longitude":"-73.9775268"}': '' };
var x1=x.toString().substring(0,13);
console.log(x.toString(4));
console.log(x1.substring(0,13));

var str="";
for(i=0;i<x.length;i++){
	str+=x.toString(i);

}
console.log(str);




app.get('/about',middleware.requireAuthentication,function(req,res){
	res.send('yourguide.me');
});




app.post('/tryme',function(req,res){

	//
	//req.body=req.body.replace('''','');
	console.log(req.body);
	//req.body=JSON.stringify(req.body);
	//console.log(req.body);
	/*

	var start_latitude=parseFloat(req.body.start_latitude);
	var start_longitude=parseFloat(req.body.start_longitude);

	var end_latitude=parseFloat(req.body.end_latitude);
	var end_longitude=parseFloat(req.body.end_longitude);

	var url='https://api.uber.com/v1/estimates/price?server_token=f1nvxqcW3F031byA9PQv-a_3BaHFG_uj1WK-lo-I&start_latitude='+start_latitude+'&start_longitude='+start_longitude+'&end_latitude='+end_latitude+'&end_longitude='+end_longitude+'';
	console.log(url);
	var ubermesage;

	request({
			url: url,
			json: true
		}, function (error, response, body) {
			if (error) {
				console.log('Unable to fetch weather.');
			} else {
				ubermesage = body;
				var ubertype1 = ubermesage.prices[0].display_name;
				var price1 = ubermesage.prices[0].estimate;
				var ubertype2 = ubermesage.prices[1].display_name;
				var price2 = ubermesage.prices[1].estimate;
				returnmessage="I can call you an "+ubertype1+" which will cost "+price1;
				console.log(returnmessage);
				res.send(returnmessage);
			}
		});


			
*/
});

app.use(express.static(__dirname + '/Public'));



app.listen(PORT,function(){
	console.log('express started on port '+PORT);
});