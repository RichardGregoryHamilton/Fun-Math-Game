
var Firebase = require("firebase");

var express = require("express");
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var session = require('express-session');

var configDB = require('./config/db.js');

app.set("port", process.env.PORT || 3000);

require('./config/passport')(passport);
//mongoose.connect('mongodb://localhost/mathgame');

var LocalStrategy = require('passport-local').Strategy;

/* Middleware */
app.use(function (req, res, next) {
    if (req.url.match(/^\/(css|js|img|font)\/.+/)) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
    }
    next();
});
app.use(express.static(__dirname + '/assets/images'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ secret: 'mysecret',
				  saveUninitialized: true,
				  resave: true}));
				  

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
var routes = require('./routes')(app, passport);
  
app.listen(app.get("port"), function() {
    console.log("Server started: http://localhost:" + app.get("port") + "/");
});
