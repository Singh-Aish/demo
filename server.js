'use strict';
var http         = require('http');
var bodyParser   = require('body-parser');
var express      = require('express');
var cookieParser = require('cookie-parser');
var port         = process.env.PORT || 1339;
var app          = express();
var path         = require('path');
var router       = express.Router();
var favicon      = require('serve-favicon');

app.use(express.static('app'));
// view engine setup

//Permitting headers for the request
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Configure passport middleware.

// Configure passport-local to use account model for authentication.
// I have already defined in config/passport file
//passport.use(new LocalStrategy(User.authenticate()));

app.use(cookieParser());

// Register routes.
app.use('/', function(req, res) {
    res.render('home'); //res.json({version: 1.0, name: 'demoSite', api: '/', type: 'It\'s default route !! Welcome to \'demoSite\''});
});

/* error handlers*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err    = new Error('Not Found');
    err.status = 404;
    next(err);
});
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        /*res.render('error', { message: err.message, error: err});*/
        res.status(err.status || 500).json({error: {message: err.message, error: err}});
    });
} else {   /* production error handler*/
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {message: err.message, error: err});
    });
}

app.set('view engine', 'vash');
app.use(favicon(__dirname + '/app/favicon.ico'));
app.set('views', path.join(__dirname, 'views'));

var server = http.createServer(app);
server.listen(port);
console.log('Environment -', app.get('env'));
console.log('At port : ' + port);
