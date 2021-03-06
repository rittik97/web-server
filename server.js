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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var pg = require('pg');
var connectionString =  'postgress://GuideMaster:Guide123@guidedb.cnciq2lktcww.us-west-2.rds.amazonaws.com:5432/postgres';
//var connectionString =  'guidedb.cnciq2lktcww.us-west-2.rds.amazonaws.com:5432/hostname:GuideMaster';
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



//var x={ '{"start_latitude":"40.6874279","start_longitude":"-73.9717465","end_latitude":"40.6846622","end_longitude":"-73.9775268"}': '' };




app.get('/about',middleware.requireAuthentication,function(req,res){
	res.send('yourguide.me');
});




app.post('/tryme',function(req,res){

	//
	//req.body=req.body.replace('''','');
	//console.log(req.query);
	console.log(req.query.start_latitude);
	//req.body=JSON.stringify(req.body);
	//console.log(req.body);
	

	var start_latitude=parseFloat(req.query.start_latitude);
	var start_longitude=parseFloat(req.query.start_longitude);

	var end_latitude=parseFloat(req.query.end_latitude);
	var end_longitude=parseFloat(req.query.end_longitude);

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
				var price1_low = ubermesage.prices[0].minimum;
				var price1_high = ubermesage.prices[0].high_estimate;

				var ubertype2 = ubermesage.prices[1].display_name;
				var price2 = ubermesage.prices[1].estimate;
				returnmessage="I can call you an "+ubertype1+" which will cost between "+price1_low+" and "+price1_high+" dollars";

				console.log(JSON.stringify(returnmessage));
				res.send(JSON.stringify(returnmessage));
			}
		});


			

});


app.post('/phonesensordata',function(req,res){
	/*

	var accx=40.00;
	var accy=40.00;
	var accz=40.00;
	var gyrox=40.00;
	var gyroy=40.00;
	var gyroz=40.00;
	*/
	console.log(req.query);
	var success=false;
	var accx=parseFloat(req.query.accx);
	var accy=parseFloat(req.query.accy);
	var accz=parseFloat(req.query.accz);
	var gyrox=parseFloat(req.query.gyrox);
	var gyroy=parseFloat(req.query.gyroy);
	var gyroz=parseFloat(req.query.gyroz);

	var client= new pg.Client(connectionString);
	client.connect(function(err) {
	  if(err) {	    return console.error('Could not connect to postgres', err);
	}
	  client.query('insert into phonesensors values(now(),'+accx+','+accy+','+accz+','+gyrox+','+gyroy+','+gyroz+')', function(err, result) {
	    if(err) {
	      return console.error('error running query', err);
	    }
	    success=true;
	    //console.log(result.rows[0].theTime);
	    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
	    client.end();
	  });
	});
	res.send("Wrote");

//https://enigmatic-reaches-59241.herokuapp.com/phonesensordata?accx=1&accy=1&accz=1&gyrox=1&gyroy=1&gyroz=60
});

app.use(express.static(__dirname + '/Public'));



app.listen(PORT,function(){
	console.log('express started on port '+PORT);
});