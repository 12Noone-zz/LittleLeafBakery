/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*					REQUIRE ALL LANGUAGES			/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

var mongoose = require('mongoose'),
	Schema	= mongoose.Schema;

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*					SET UP SCHEMA       			/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

var articleSchema = Schema({
	title: {type: String, require: true},
	author: {type: String, require: true},
	content: {type: String, require: true},
	category: String,
	date: {type: Date, default: Date.now},
	upvote: 0,
	downvote: 0,
	image: String
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;