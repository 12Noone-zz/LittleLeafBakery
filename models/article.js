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
	createdAt: {type: Date, default: Date},
	updatedAt: {type: Date, default: Date.now},
	vote: {type: Number, default: 0},
	image: String
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;