var express = require('express');
var router = express.Router();
var bets = require('../models/bets.js');
var Cookies     = require('cookies');
var jwt         = require('jsonwebtoken'); 

module.exports = function(app){

	app.post('/api/auth', function(req, res){
		
        console.log("Okay!");
		
		var username = req.body.username;
		var password = req.body.password;
		
		bets.userAuth(function(res){
			
		console.log(res.body);
		
		var checked = false;
		for (i in res.body){

			if (res.body.username == username && res.body.password == password){

				var token = jwt.sign(admin, app.get('jwtSecret'), {
					expiresIn: 1440
				})

				new Cookies(req, res).set('access_token', token, {
					httpOnly: true,
					secure: false
					});
			
				console.log("Cookie Sent");
				checked = true;
			}
		}
		if (checked == false){
            console.log("No Cookie Sent");
			}
		});
	});

	app.get('/', function(req,res) {
		res.redirect('/login')
	});

	app.get('/login', function(req,res) {
		res.render('login');
	});

	app.get('/createUser', function(req,res) {
		res.render('createUser');
	});

	app.get('/home', function(req,res, next) {

        var token = new Cookies(req, res).get('access_token');

        console.log(token);

        jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
            if (err) {

                console.log("bad cookie");

                return res.json({success: false, message: "access denied."})
            }
            else {

                console.log("good cookie");

                next();
            }
        })
		res.render('home');
	});

	app.get('/myBets', function(req,res, next) {

        var token = new Cookies(req, res).get('access_token');

        console.log(token);

        jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
            if (err) {

                console.log("bad cookie");

                return res.json({success: false, message: "access denied."})
            }
            else {

                console.log("good cookie");

                next();
            }
        })
		res.render('myBets');
	});

	app.get('/newBets', function(req,res, next) {

        var token = new Cookies(req, res).get('access_token');

        console.log(token);

        jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
            if (err) {

                console.log("bad cookie");

                return res.json({success: false, message: "access denied."})
            }
            else {

                console.log("good cookie");

                next();
            }
        })
		res.render('newBets');
	});

	app.post('/createUser/create', function(req,res) {
		bets.insertOne(['username', 'first_name', 'last_name', 'password', 'email'], [req.body.username, req.body.first_name, req.body.last_name, req.body.password, req.body.email], function(data){
			res.redirect('/createUser')
		});
	});

	app.put('/bets/update/:itemID', function(req,res) {
		var condition = 'itemID = ' + req.params.itemID;

		console.log('condition', condition);

		bets.update({'devoured' : req.body.devoured}, condition, function(data){
			res.redirect('/bets');
		});
	});
	
}