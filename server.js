var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var database = require('./config/databaseConfig');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect(database.localUrl);

//app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));

require('./middleware/cors.js')(app);
require('./routes/basicRoutes.js')(app);
//require('./middleware/authentication.js')(app);
//require('./middleware/authorization.js')(app);
require('./routes/taskRoutes.js')(app);
require('./routes/userRoutes.js')(app);

app.listen(port);
console.log("Team Tracker API listening on port " + port);