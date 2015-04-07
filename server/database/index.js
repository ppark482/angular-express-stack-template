/*//////////////////////////////////////////////////////////////////////////////
// 
	Database Interface
// 
//////////////////////////////////////////////////////////////////////////////*/
var mongoose = require('mongoose');
var UserModel = require('./schemas/users');

// Connections 
var developmentDb = ''; // url to development Database
var productionDb = ''; // url to production Database
var usedDb;

// if development
if (process.env.NODE_ENV === 'development') {
	// set database to the development one
	usedDb = developmentDb;
	// connect to it here
	mongoose.connect(usedDb);
}

// if production
if (process.env.NODE_ENV === 'production') {
	// set database to the production one
	usedDb = productionDb;
	// connect to it here
	mongoose.connect(usedDb);
}

// get an instance of our connection to our database
var db = mongoose.connection;

// Log that the connection has successfully been opened
db.on('error', console.error.bind(console, 'connection error:'));
// Open the connection
db.once('open', function callback () {
	console.log('Database Connection Successfully Opened at ' + usedDb);
});

exports.users = UserModel;