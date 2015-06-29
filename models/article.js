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
	vote: Boolean
});



var Article = mongoose.model('Article', articleSchema);

module.exports = Article;