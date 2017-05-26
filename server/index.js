// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var request = require('request');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var Web3 = require('web3');
var path = require('path');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));

var port = process.env.PORT || 8888;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8888/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' }); 
});
// more routes for our API will happen here

router.route('/create_account')
    // create an account
    .post(function(req, res) {
    	console.log(req.body);
	    request({
	       url: 'http://localhost:8545',
	       method: 'POST',
	       json: req.body['data']
	   	}, function(error, response, body) {
	   		console.log(error);
		       if (error) {
		         res.send({
		             status: "failure",
		             data : body
		         });
		       } else {
		           res.send({
		               status: "success",
		               status: "success",
		               data: body
		           });
		       }
	   });
	    // console.log(lms.numMembers);
	    // lms.addMember(req.body.name, res.body['data']['result'], req.body.email);
	    // console.log(lms.numMembers);
    });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
