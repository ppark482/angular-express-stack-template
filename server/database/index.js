/*//////////////////////////////////////////////////////////////////////////////
// 
	Database Interface
// 
//////////////////////////////////////////////////////////////////////////////*/
var mysql = require('mysql');

// Connections 
var developmentDb = mysql.createConnection({
	host 			: 'localhost',
	user 			: 'root',
	password 	: ''
});

var productionDb = mysql.createConnection({
	host 			: '',
	user 			: '',
	password 	: ''
});
var usedDb;

// if development
if (process.env.NODE_ENV === 'development') {
	// set database to the development one
	usedDb = developmentDb;
	// connect to it here
	usedDb.connect( function (err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;		
		}
		console.log('connected as id ' + usedDb.threadId);
	});
}

// if production
if (process.env.NODE_ENV === 'production') {
	// set database to the production one
	usedDb = productionDb;
	// connect to it here
	usedDb.connect( function (err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;			
		}
		console.log('connected as id ' + usedDb.threadId);
	});
}

/*//////////////////////////////////////////////////////////////////////////////
// 
	Schema Exports
// 
//////////////////////////////////////////////////////////////////////////////*/