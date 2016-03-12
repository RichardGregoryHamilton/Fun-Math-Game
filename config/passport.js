var LocalStrategy   = require('passport-local').Strategy;

var User = require('../models/user');

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var USERS_FILE = (path.join(__dirname,  '../', 'users.json'));

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
	
	passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        process.nextTick(function() {

			User.findOne({ 'local.username' :  username }, function(err, user) {

				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				} else {
					var newUser            = new User();
					newUser.local.username = username;
					newUser.local.password = newUser.generateHash(password);
					newUser.loggedIn = true;
					
					newUser.save(function(err) {
						if (err) 
							throw err;
						
						fs.readFile(USERS_FILE, function(err, data) {
							var users = JSON.parse(data) || [];
							
							users.push(newUser);
							fs.writeFile(USERS_FILE, JSON.stringify(users));
						});

						return done(null, newUser);
					});
				}

			});    

        });

    }));
	
	passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        User.findOne({ 'local.username' :  username }, function(err, user) {

            if (err) {
                return done(err);
			}
            // if no user is found, return the message
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
			}
            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Wrong password.'));
			}
			
			return done(null, user);
        });

    }));

};