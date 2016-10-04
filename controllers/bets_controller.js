var express = require('express');
var router = express.Router();
var bets = require('../models/bets.js');
var Cookies = require('cookies');
var jwt = require('jsonwebtoken'); 
var path = require('path');

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

					var loginRedirectObj = {
						type: "admin",
						path: "/admin"
					}
					
					rest.json(loginRedirectObj);
					//rest.json('admin');
				}
				
				else{
					console.log('You are not Admin');

					var loginRedirectObj = {
						type: "user",
						path: "/home"
					}
					
					rest.json(loginRedirectObj);
					//rest.json('user');
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
		res.redirect('/index');
	});

	app.get('/index', function(req,res) {
		res.render('index');
	});

	app.get('/home', function(req,res) {
		console.log("got to home");

		//ASK DAVID WHERE TO SAVE USERNAME ONCE LOGGED IN?


        var token = new Cookies(req, res).get('access_token');

        console.log(token);

        jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
            if (err) {

                console.log("bad cookie");

                return res.json({success: false, message: "access denied."})
            }
            else {

                console.log("good cookie");

                var hbsObject = {
                	currentUsername: "John's",
                	handlebar2: "Test2"
                }

                res.render("home", hbsObject);
            }
        })
		
	});

	app.get('/admin', function(req,res) {
		console.log("got to admin");

        var token = new Cookies(req, res).get('access_token');

        console.log(token);

        jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
            if (err) {

                console.log("bad cookie");

                return res.json({success: false, message: "access denied."})
            }
            else {

                console.log("good cookie");

                var hbsObject = {
                	username: "John's",
                	handlebar2: "Test2"
                }

                res.render("admin", hbsObject);
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
                //Maybe add a redirect to login page?
            }
            else {

                console.log("good cookie");

                res.render('myBets');
            }
        })
	});

	app.get('/newBet', function(req,res, next) {

        var token = new Cookies(req, res).get('access_token');

        console.log(token);

        jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
            if (err) {

                console.log("bad cookie");

                return res.json({success: false, message: "access denied."})
            }
            else {

                console.log("good cookie");

                res.render('newBets');
            }
        })
	});

	app.get('/logout', function(req,res, next) {

		console.log("This is logout bets");
		res.redirect('/index'); //THIS DOESN'T END THE TOKEN THOUGH OR INVALIDATE THE COOKIE


		//SEE IF JOHN CAN FIGURE OUT HOW TO SET COOKIE TIMER EXPIRE TO CURRENT TIME? 

	});


	app.post('/api/createUser', function(req,res) {
		
		console.log("Create Started.");
		
		var username = req.body.newUsername;
		var password = req.body.newPassword;

		var usernameExists = false;

		bets.userAuth("users", function(resData){
			console.log(resData);

			
			for (i in resData) {
				if (resData[i].username == username){
					usernameExists = true;
				}				
			}

			if (usernameExists == true) {
				//console.log("username was picked already");
				res.json(true);
			}
			else {
				//console.log("username is available");
				bets.insertOne(['username', 'first_name', 'last_name', 'password', 'email'], [req.body.newUsername, req.body.firstName, req.body.lastName, req.body.newPassword, req.body.newEmail], function(data){
					//console.log("added the user to the database");
					res.json(false);
				});
			}
		});
	});

	app.put('/api/addBet/', function(req,res) {
		var usernameP1 = req.body.usernameP1;
		var usernameP2 = req.body.usernameP2;

		bets.userData("users", function(resData){
			console.log(resData);

			usernameExistsP1 = false;
			usernameExistsP2 = false;
			
			for (i in resData) {
				if (resData[i].username == usernameP1){
					usernameExists = true;
					var userIdP1 = resData[i].user_id;
					var userPointsP1 = resData[i].current_points;
				}
				if (resData[i].username == usernameP2){
					usernameExistsP2 = true;
					var userIdP2 = resData[i].user_id;
					var userPointsP2 = resData[i].current_points;
				}
			}

			if (usernameExistsP1 == true && usernameExistsP2 == true) {
				
				if (userPointsP1 - req.body.points >= 0 && userPointsP1 - req.body.points >= 0){
				
				bets.insertBet(['p1_id', 'p2_id', 'p1_answer', 'bet_amount', 'bet_text','judge'], [userIdP1, userIdP2, req.body.P1answer, req.body.points, req.body.betText, req.body.judge], function(data){
				
				res.json(true);	
				}	
			}
			else {
					res.json(false);
				});
			}
		});
	});
}