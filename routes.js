var passport = require('passport');
var fs = require('fs');
var path = require('path');
var session = require('express-session');
var USERS_FILE = (path.join(__dirname, 'users.json'));

//var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var flash = require('connect-flash');

require('./config/passport')(passport);

module.exports = function(app, passport) {

    var scripts = __dirname + "/scripts";
    var views = __dirname + "/views";
    var partials = views + "/partials";
	
	app.get("/users.json", function(req, res) {
		res.sendFile(__dirname + "/users.json");
	});
	
	app.get("/scores.json", function(req, res) {
		res.sendFile(__dirname + "/scores.json");
	});
	
    app.get("*/styles.min.css", function(req, res) {
        res.sendFile(__dirname + "/assets/stylesheets/styles.min.css");
    });

    app.get("*/bootstrap.min.css", function(req, res) {
        res.sendFile(__dirname + "/assets/stylesheets/bootstrap.min.css");
    });

    app.get("*/styles.css", function(req, res) {
        res.sendFile(__dirname + "/assets/stylesheets/styles.css");
    });

    app.get("*/main.min.js", function(req, res) {
        res.sendFile(scripts + "/main.min.js");
    });

    app.get("/", function(req, res) {
        res.sendFile(__dirname + "/index.html");
    });

    app.get("/views/partials/header", function(req, res) {
        res.sendFile(partials + "/header.html");
    });

    app.get("/views/partials/footer", function(req, res) {
        res.sendFile(partials + "/footer.html");
    });

    app.get("/views/partials/links", function(req, res) {
        res.sendFile(partials + "/links.html");
    });

    app.get("/views/help", function(req, res) {
        res.sendFile(views + "/help.html");
    });

    app.get("/views/scores", function(req, res) {
        res.sendFile(views + "/scores.html");
    });

    app.get("/views/achievements", function(req, res) {
        res.sendFile(views + "/achievements.html");
    });

    app.get("/views/faq", function(req, res) {
        res.sendFile(views + "/faq.html");
    });

    app.get("/views/related", function(req, res) {
        res.sendFile(views + "/related.html");
    });

	app.get("/views/login", function(req, res) {
		res.sendFile(views + "/login.html");
	});
	
    app.get("/views/register", function(req, res) {
        res.sendFile(views + "/register.html");
    });
	
	app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '../',
        failureRedirect : '/views/register',
		failureFlash: 'Invalid username or password'
    }));
	
	 app.post('/login', passport.authenticate('local-login', {
        successRedirect : '../', 
        failureRedirect : '/views/login'
    }));
	
	app.get('/logout', function(req, res) {
		//console.log(req.user);
		
        req.logout();
        console.log(req.user);
		fs.readFile(USERS_FILE, function(err, data) {
			var data = JSON.parse(data);
			
			var active = data.filter(function(user) {
				return user["loggedIn"] = true;
			});
			
			var nonActive = data.filter(function(user) {
				return user["loggedIn"] = false;
			});
			
			active[0]["loggedIn"] = false;
			if (data.length === active.length) {
				fs.writeFile(USERS_FILE, JSON.stringify(active));
			}
			else {
				userList = active.concat(nonActive);
				fs.writeFile(USERS_FILE, JSON.stringify(userList));
			}
			
		});
		res.redirect('/');
    });
	
	function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
		if (req.isAuthenticated()) {
			return next();

			// if they aren't redirect them to the home page
			res.redirect('/');
		}
	}
}