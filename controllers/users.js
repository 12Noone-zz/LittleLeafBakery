/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*				CONTROLLER SESSIONS/LOGINS 			/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

var express = require('express'),
	router	= express.Router(),
	User	= require('../models/user.js');

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*			    	CREATE A USER           		/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

router.get('/new', function(req, res) {
	res.render('users/new');
});

router.post('/', function(req, res) {
	var newUser = new User(req.body.user);

	newUser.save(function(err, user){
		console.log(newUser);
		res.redirect(301, '../')
	});
});

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*			    	LOGIN A USER            		/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

router.get('/login', function(req,res){
	res.render('users/login');
});

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*			   USER/PASSWORD VALIDATOR              /
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

router.post('/login', function  (req,res) {
	var loginAttempt = req.body.user;
	User.findOne({username: loginAttempt.username}, function  (err, user) {
		if (user && user.password === loginAttempt.password) {
			req.session.currentUser = user.username;
			res.redirect(301, '../articles');
			console.log(req.session.currentUser);
			console.log('this is the right password');
		}
		else {
			res.redirect(301, '/users/login');
			console.log('this was the wrong password');
		}
	});
});

module.exports = router;

