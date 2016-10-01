var express = require('express');
var router = express.Router();
var bets = require('../models/bets.js');
var Cookies     = require('cookies');
var jwt         = require('jsonwebtoken'); 

module.exports = function(app){

	app.post('/api/auth', function(req, rest){
		
        console.log("Auth Started.");
		
		var username = req.body.username;
		var password = req.body.password;
		
		bets.userAuth("users", function(res){
			
		console.log(res);
		
		var checked = false;
		for (i in res){

			if (res[i].username == username && res[i].password == password){

				var user = {
					"username":username,
					"password":password
				}
				
				console.log(user);
				
				var token = jwt.sign(user, app.get('jwtSecret'), {
					expiresIn: 1440
				})
				
				new Cookies(req, rest).set('access_token', token, {
					httpOnly: true,
					secure: false
					});
			
				console.log("Cookie Sent");
				
				checked = true;
				
				if (res[i].admin == "1"){
					console.log('You are Admin');
					rest.json('admin');
				}
				
				else{
					console.log('You are not Admin');
					rest.json('user');
					}
			}
		}
		if (checked == false){
			rest.json('fail');
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

	app.get('/home', function(req,res) {

        var token = new Cookies(req, res).get('access_token');

        console.log(token);

        jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
            if (err) {

                console.log("bad cookie");

                return res.json({success: false, message: "access denied."})
            }
            else {

                console.log("good cookie");

                res.render('home');
            }
        })
		
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
		
		console.log("Create Started.");
		
		var username = req.body.username;
		var password = req.body.password;
		
		bets.userAuth("users", function(resData){
			
		console.log(resData);
		
		var checked = false;
		for (i in resData){

			if (resData[i].username == username){
					checked == true;
			}
		}
		
		if (checked == false){
		bets.insertOne(['username', 'first_name', 'last_name', 'password', 'email'], [req.body.username, req.body.first_name, req.body.last_name, req.body.password, req.body.email], function(data){
		rest.json(true);		
		});
		}
		else{
			rest.json(false);
		}
	});

	app.put('/bets/update/:itemID', function(req,res) {
		var condition = 'itemID = ' + req.params.itemID;

		console.log('condition', condition);

		bets.update({'devoured' : req.body.devoured}, condition, function(data){
			res.redirect('/bets');
		});
	});
	
}