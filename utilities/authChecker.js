/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
/*			    USER AUTHENTICATION     			/
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

function isAuthenticated(req, res, next) {
	console.log(req);
    if (req.session.currentUser) {
        return next();
    }
    else {
    
    	res.redirect('/users/login');
	}
}


module.exports = isAuthenticated; 