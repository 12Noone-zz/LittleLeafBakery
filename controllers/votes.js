var express = require('express'),
	router	= express.Router(),
	User	= require('../models/vote.js');

router.get('/', function(req, res) {
	console.log('I\'m working');
});