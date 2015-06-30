/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*					REQUIRE ALL LANGUAGES			/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/	
var express 		= require('express'),
	server			= express(),
	ejs				= require('ejs'),
	bodyParser		= require('body-parser'),
	methodOverride	= require('method-override'),
	expressLayouts	= require('express-ejs-layouts'),
	morgan			= require('morgan'),
	mongoose		= require('mongoose'),
	session			= require('express-session');
	jquery			= require('jquery');

//sets it to the process port. says "use whatever port is defined OR default to 3000"
var PORT = process.env.PORT || 3000;
var MONGOURI = process.env.MONGOLAB_URI ||'mongodb://localhost:27017/wiki_app';
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*					SET VIEWS FOR EJS    			/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

server.set('views', './views');
server.set('view engine', 'ejs');

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*					SETTING UP SESSION         		/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

server.use(session({
	secret: 'thinkofapassword',
	resave: true,
	saveUninitialized: false
}));

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*			 SETTING UP EXPRESS'S static			/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

server.use(express.static('./public'));

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*				SETTING UP BODYPARSER		    	/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

server.use(bodyParser.urlencoded({
	extended: true
}))

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*				SETTING UP METHOD-OVERRIDE			/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

server.use(methodOverride('_method'));

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*				SETTING UP MORGAN       			/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

server.use(morgan('short'));

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*				SETTING UP EXPRESS LAYOUTS			/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

server.use(expressLayouts);


/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*				     CONTROLLERS  			        /
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/


var articlesController = require('./controllers/articles.js');
var userController = require('./controllers/users.js');
// var frontEnd = require('./public/frontend.js');
server.use('/articles', articlesController);
server.use('/users', userController);

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*				     BASE ROUTES 			        /
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

server.get('/', function(req, res){
	res.render('homepage');
});

server.use(function(req, res) {
	res.status(404);
	res.send("Broken dreams, promises, and links. This is one of those.");
});

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*				DATABASE AND SERVER 			    /
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

mongoose.connect(MONGOURI);
var db = mongoose.connection;

db.on('error', function() {
	console.log("you done fucked up boy.");
});

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*		  INITIALIZE DATABASE AND SERVER 		    /
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/


db.once('open', function() {
	console.log("Database on, starting server...");
	server.listen(PORT, function() {
		console.log("server is on, lets rock and cinnamon roll");
	});
});
