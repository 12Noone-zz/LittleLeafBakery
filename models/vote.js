var mongoose = require('mongoose'),
	Schema	= mongoose.Schema;

var voteSchema = Schema({
	author: String,
	article: String,
	voteCount: Number
});

var Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;