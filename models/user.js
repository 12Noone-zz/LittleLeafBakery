/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*				SESSIONS AND LOGINS     			/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

var mongoose = require('mongoose'),
	Schema	= mongoose.Schema;

var userSchema = Schema({ 
	username: { type: String, required: true},
	password: { type: String, required: true},
	bio: String,
	age: Number,
	avatar: String
});

var User = mongoose.model("User", userSchema);

module.exports = User; 