var mongoose = require('mongoose'),
	Schema	= mongoose.Schema;

var voteSchema = Schema({
	user: String,
	article: String,
});

var Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;