// required modules
var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var login = require('./routes/login');
var signup = require('./routes/signup');
var logout = require('./routes/logout');
var user = require('./routes/user');
var wall = require('./routes/wall');
var search = require('./routes/search');


// settings
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middlewares
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(expressSession({ secret: 'max', saveUninitialized: false, resave: false }));
app.use(express.static(__dirname + '/public'));
app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/user', user);
app.use('/wall', wall);
app.use('/search', search);


// port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App listening on port ' + port + '!');
});