/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*					REQUIRE ALL LANGUAGES			/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

var express = require('express'),
	router	= express.Router(),
	Article	= require('../models/article.js'); 

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*				        ROUTES				    	/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

/*~*~*~*~*~*~*~~*~*~*/
/*		  INDEX	     /
/*~*~*~*~*~*~**~*~*~*/

router.get('/', function(req, res) {
	Article.find({}, function(err, articlesArray) {
		if (err) {
			console.log(err);
		}
		else {
			res.render('articles/index', {articles: articlesArray});
		};
	});
});

/*~*~*~*~*~*~*~~*~*~*/
/*		  NEW        /
/*~*~*~*~*~*~**~*~*~*/

router.get('/new', function(req, res) {
	res.render('articles/new');
});

/*~*~*~*~*~*~*~~*~*~*/
/*	   CREATE        /
/*~*~*~*~*~*~**~*~*~*/

router.post('/', function(req, res) {
	var newArticle = new Article(req.body.article);
	// newArticle.author = req.session.currentuser;
	newArticle.save(function(err, article) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(article);
			res.redirect(301, '/articles');
		}
	});
});

/*~*~*~*~*~*~*~~*~*~*/
/*	     SHOW        /
/*~*~*~*~*~*~**~*~*~*/

router.get('/:id', function(req, res) {
	var mongoId = req.params.id;
	Article.findOne({_id: mongoId}, function(err, foundArticle) {
		if(err) {
			console.log(err);
		}
		else {
			res.render('articles/show', {article: foundArticle});
		};
	});
});

/*~*~*~*~*~*~*~~*~*~*/
/*	   DELETE        /
/*~*~*~*~*~*~**~*~*~*/

router.delete('/:id', function(req,res) {
	var mongoId = req.params.id;
	Article.remove({_id: mongoId}, function(err, foundArticle) {
	 	res.redirect(301, '/articles');
	});
});

/*~*~*~*~*~*~*~~*~*~*/
/*	     EDIT        /
/*~*~*~*~*~*~**~*~*~*/

router.get('/:id/edit', function(req, res) {
	var mongoId = req.params.id;
	Article.findOne({_id: mongoId}, function(err, foundArticle) {
		if (err) {
			console.log(err);
		}
		else {
			res.render('articles/edit', {article: foundArticle});
		}
	});
});

/*~*~*~*~*~*~*~~*~*~*/
/*	    PATCH        /
/*~*~*~*~*~*~**~*~*~*/

router.patch('/:id', function(req,res) {
	var mongoId = req.params.id;
	var updated = req.body.article;

	Article.update({_id: mongoId}, updated, function(err, articleItem) {
		if (err) {
			console.log(err);
		}
		else {
			res.redirect(301, '/articles/' + mongoId);
		}
	});
});

module.exports = router;