/*//////////////////////////////////////////////////////////////////////////////
// 
	Signup Route
		- when posting a new user
// 
//////////////////////////////////////////////////////////////////////////////*/

var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Users = db.users;

// POST /signup route
router.post('/', function (req, res) {

	// posted information from front-end
	var body = req.body;
	// time of posting
	var time = moment().format('MMMM Do YYYY, h:mm:ss a');

	// check to see if user already exists
	// using email address
	Users.findOne({

		'email': body.email

	}, function (err, user) {

			// if there's an error, log it and return to user
			if (err) {
				console.log('Couldn\'t create new user at ' + color.red(time) + ' by ' + color.red(body.email) + ' because of: ' + err);
				// send error
				res.status(500).json({
					'message': 'Internal server error from signing up new user. Please contact administrator.'
				});
			} // end error

			// if user doesn't exist, create one
			if (!user) {
				console.log('Creating a new user at ' + color.green(time) + ' with the email: ' + color.green(body.email));
				var newUser = new Users({
					firstname: body.firstname,
          lastname: body.lastname,
          email: body.email,
          password: body.password1
				});

				// save new user to database
				newUser.save( function (err, savedUser, numberAffected) {
					if (err) {
	          console.log('Problem saving the user ' + color.yellow(body.email) + ' due to ' + err);
	          res.status(500).json({
	              'message': 'Database error trying to sign up.  Please contact administrator.'
	          });
          }

          console.log('Successfully created new user: ' + color.green(body.email));
          res.status(201).json({
          	'message': 'Successfully created new user',
            'client': _.omit(savedUser, 'password')
          });

				}); // end newUser save

			} // end create user

			// If the user already exists...
      if (user) {
        res.status(409).json({
            'message': body.email + ' already exists!'
        });
      }

    }); // end Users.findOne

}); // end POST

// export the router for usage in server/router/index.js
module.exports = router;