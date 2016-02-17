var middleware = {
	requireAuthentication: function(req,res,next){
		console.log('auth');
		next();
	},
	logger: function(req,res,next){
		console.log(req.method);
		next();

	}
	// new Date().toString;

};

module.exports = middleware;