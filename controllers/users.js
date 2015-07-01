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
		if (err) {
			console.log(err); 
		} else {
			console.log(newUser);
			res.redirect(301, '../')
		}
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
	console.log(req.body);
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

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*			          USER INDEX                    /
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

router.get('/', function(req, res) {
	User.find({}, function(err, userArray) {
		if (err) {
			console.log(err);
		}
		else {
			res.render('users/index', {users: userArray});
		};
	});
});

/*~*~*~*~*~*~*~~*~*~*/
/*		  SHOW	     /
/*~*~*~*~*~*~**~*~*~*/

router.get('/:id', function(req, res) {
	var mongoId = req.params.id;
	User.findOne({_id: mongoId}, function(err, foundUser) {
		if(err) {
			console.log(err);
		}
		else {
			res.render('users/show', {user: foundUser});
		};
	});
});

/*~*~*~*~*~*~*~~*~*~*/
/*	   DELETE        /
/*~*~*~*~*~*~**~*~*~*/

router.delete('/:id', function(req,res) {
	var mongoId = req.params.id;
	User.remove({_id: mongoId}, function(err, foundUser) {
	 	res.redirect(301, '/users');
	});
});

/*~*~*~*~*~*~*~~*~*~*/
/*	     EDIT        /
/*~*~*~*~*~*~**~*~*~*/

router.get('/:id/edit', function(req, res) {
	var mongoId = req.params.id;
	User.findOne({_id: mongoId}, function(err, foundUser) {
		if (err) {
			console.log(err);
		}
		else {
			res.render('users/edit', {user: foundUser});
		}
	});
});

/*~*~*~*~*~*~*~~*~*~*/
/*	    PATCH        /
/*~*~*~*~*~*~**~*~*~*/

router.patch('/:id', function(req,res) {
	var mongoId = req.params.id;
	var updated = req.body.user;

	User.update({_id: mongoId}, updated, function(err, UserItem) {
		if (err) {
			console.log(err);
		}
		else {
			res.redirect(301, '/users/' + mongoId);
		}
	});
});
module.exports = router;

