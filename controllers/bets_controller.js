var express = require('express');
var router = express.Router();
var bets = require('../models/bets.js');
var Cookies = require('cookies');
var jwt = require('jsonwebtoken'); 
var path = require('path');
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
 
module.exports = function(app){

	app.post('/api/auth', function(req, rest){
		
        console.log("Auth Started.");
		
		var username = req.body.username;
		var password = req.body.password;
		var currentUsername;
		var currentUserID;

		bets.userAuth("users", function(res){
			
		console.log(res);
		
		var checked = false;
		for (i in res){

			if (res[i].username == username && res[i].password == password){

				var user = {
					"username":username,
					"password":password
				}

				currentUsername = res[i].username;
				currentUserID = res[i].user_id;
				//console.log(currentUsername);
				//console.log(currentUserID);

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
						path: "/admin",
						currentUsername: currentUsername,
						currentUserID: currentUserID
					}

					rest.json(loginRedirectObj);
					//rest.json('admin');
				}
				
				else{
					console.log('You are not Admin');

					var loginRedirectObj = {
						type: "user",
						path: "/home",
						currentUsername: currentUsername,
						currentUserID: currentUserID
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

	app.get('/update', function(req,res) {
	
	bets.betData("bets", function(resData){
		console.log(resData);
		res.redirect('/home');
	});
	});
	
	app.get('/home', function(req,res) {
		console.log("got to home");
		
		
        var token = new Cookies(req, res).get('access_token');

        console.log(token);

        jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
            if (err) {

                console.log("bad cookie");

                return res.json({success: false, message: "access denied."})
            }
            else {

                console.log("good cookie");

                var currentUsername = localStorage.getItem("currentUsername");
                var currentUserID = localStorage.getItem("currentUserID");
                //console.log(currentUserID);
                
                var homeDataObj = {};

                bets.selectWhereBetsOr("p1_id", "p2_id", currentUserID, function(userBetsData){
                	//console.log(userBetsData);
                	homeDataObj.bets = userBetsData;

                	bets.selectWhereAndNull("judge", "'community'", "result", function(communityBetsData){
                		//console.log(communityBetsData);
                		homeDataObj.users = communityBetsData;

	            		bets.selectWhereUsers("user_id", 1, function(userData){                			
	        				//console.log(userData);

	        				homeDataObj.usersStats = userData;

			                var hbsObject = {
			                	currentUsername: currentUsername,
			                	currentBets: userBetsData,
			                	userData: userData,
			                	communityBets: communityBetsData
			                }

			                //console.log(hbsObject);
							
							bets.betData("bets", function(resData){
								var date = new Date();
								for (i in resData){
									var isValid = true;
									if (resData[i].result == null){
										if(resData[i].create_date.getYear() != date.getYear())
										{isValid = false;}
										else if (resData[i].create_date.getMonth() != date.getMonth())
										{isValid = false;}
										else if(date.getDay() - resData[i].create_date.getDate() > 2 )
										{isValid = false;}
										if (isValid == false){
											isValid = true;
											var condition = 'bet_id = ' + resData[i].bet_id;
											bets.updateBet({'result' : "'draw'"}, condition, function(data){
											});
										}
									}
								}
								res.render("home", hbsObject);
							});
							
								
							
	            		})
            		})
                })
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

                var currentUsername = localStorage.getItem("currentUsername");
				var hbsObject = {
                	currentUsername: currentUsername
                }

                res.render("myBets", hbsObject);
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

                var currentUsername = localStorage.getItem("currentUsername");
				var hbsObject = {
                	currentUsername: currentUsername
                }

                res.render("newBet", hbsObject);
            }
        })
	});

	app.get('/logout', function(req,res, next) {
			
				var token = jwt.sign({logout : "Logout"}, app.get('jwtSecret'), {
					expiresIn: 0
				})
				
				new Cookies(req, res).set('access_token', token, {
					httpOnly: true,
					secure: false
					});

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

	app.post('/api/addBet/', function(req,res) {

		console.log("Get here")

		var usernameP1 = req.body.usernameP1;
		var usernameP2 = req.body.usernameP2;

		bets.userData("users", function(resData){
			console.log(resData);

			usernameExistsP1 = false;
			usernameExistsP2 = false;
			

			for (i in resData) {
				if (resData[i].username == usernameP1){
					usernameExistsP1 = true;
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
				
					var redirectObj = {
						isCreated: true,
						path: "/home"
					};

					res.json(redirectObj);	
				})	
			}
			else {
					var redirectObj = {
						isCreated: false
					};

					res.json(redirectObj);
				};
			}
		});
	});
	
	app.put('/api/acceptBet/:id', function(req,res) {
		var condition = 'bet_id = ' + req.params.id;
		
		if (req.body.agree == true){		
			bets.updateBet({'p2_answer' : req.body.P2answer, 'p2_agree' : req.body.agree}, condition, function(data){
				res.redirect('/home');
			});
		}
		else{
			bets.updateBet({'result' : 'draw', 'p2_agree' : req.body.agree}, condition, function(data){
				res.redirect('/home');
			});
		}
	});

	app.post('/api/checkVote', function(req,res) {
		
		console.log("Check Vote Started.");

		var currentBetID = req.body.currentBetID;
		var currentUserID = req.body.currentUserID;
		var voterPick = req.body.voterPick;

		var userAlreadyVoted = false;

		bets.selectWhereVotes("bet_id", currentBetID, function(resData){
			console.log(resData);

			for (i in resData) {
				if (resData[i].voter_id == currentUserID){
					userAlreadyVoted = true;
				}				
			}

			if (userAlreadyVoted) {
				console.log("user already voted");
				res.json(true);
			}
			else {
				console.log("user has not voted yet");
				bets.insertVote(['bet_id', 'voter_id', 'voter_pick'], [currentBetID, currentUserID, voterPick], function(data){
					//console.log("added vote to the database");
					res.json(false);
				})
			}
		});
	});

}