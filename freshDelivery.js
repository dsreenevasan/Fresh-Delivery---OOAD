var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
mongoose.Promise = global.Promise;


// config files
var db = require('./server/config/dbConfig.json');
var host = db.mongo.gamma.host;
var dbPort = db.mongo.gamma.port;
var dbConnection = host + "/" + dbPort;

// set our port
var port = 2112;

// connect to  mongoDB
mongoose.connect(dbConnection, function(err) {
    if (err) throw err;
});

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

//set the public folder of the app
/*app.use(express.static(__dirname + '/angularjs-cart-master/ShoppingCart'));*/
app.use(express.static(__dirname + '/client'));

//load basic route for server
var routes = require('./server')(app);

// startup our app at http://localhost:3000
app.listen(port);

// shoutout to the user
console.log(port);

// expose app
exports = module.exports = app;

