// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var jwt  = require('jsonwebtoken');

var app = express();

app.set('jwtSecret', "CODINGROCKS");



//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Routes
require('./controllers/bets_controller.js')(app);

//var routes = require('./controllers/bets_controller.js');
//app.use('/', routes);

// Starts the server to begin listening
var PORT = 8080;
app.listen(PORT, function(){
	console.log('App listening on: http://localhost:' + PORT);
})


