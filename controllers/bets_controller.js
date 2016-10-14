var express = require('express');
var router = express.Router();
var bets = require('../models/bets.js');
var Cookies = require('cookies');
var jwt = require('jsonwebtoken'); 
var path = require('path');
var moment = require('moment');


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


                //UPDATE ANY COMMUNITY BETS AND EXPIRE THEM
				bets.betData("bets", function(resData){
					bets.betCommunity("votes", function(resCData){
					var date = new Date();
					//console.log(resData);
					var betID;

					for (i in resData){
						var isValid = true;
						if (resData[i].result == null){
							if(resData[i].create_date.getYear() != date.getYear()) {
								isValid = false;
							}
							else if (resData[i].create_date.getMonth() != date.getMonth()) {
								isValid = false;
							}
							else if(date.getDate() - resData[i].create_date.getDate() > 2 ) {
								isValid = false;
							}

							if (isValid == false){
								isValid = true;
								var condition = 'bet_id = ' + resData[i].bet_id;

								betID = resData[i].bet_id;

								if (resData[i].judge == "community"){
									var p1 = 0;
									var p2 = 0;
									for(e in resCData){
										if (resData[i].bet_id == resCData[e].bet_id && "p1" == resCData[e].voter_pick){
											p1 += 1;
										}
										else if (resData[i].bet_id == resCData[e].bet_id && "p2" == resCData[e].voter_pick){
											p2 += 1;
										}
									}
									
									if (p1 == p2){var Judgement = "draw";}
									else if (p1 > p2){var Judgement = "p1";}
									else if (p1 < p2){var Judgement = "p2";}
									
									
		if (Judgement == "draw"){
		bets.updateBet({'result' : "'" + Judgement + "'"}, condition, function(data){
				//res.redirect('/home');
			});	
		}
		else {
			bets.betJudge("bets", function(resBData){

				var conditionP1;
				var conditionP2;
				
				var points;

				for (r = 0; r < resBData.length; r++) {
					if (resBData[r].bet_id == betID) {

						points = resBData[r].bet_amount;
						conditionP1 = 'user_id = ' + resBData[r].p1_id;
						conditionP2 = 'user_id = ' + resBData[r].p2_id;
					}
				}
				
				if (Judgement == "p1"){	
					bets.updateBet({'result' : "'" + Judgement + "'"}, condition, function(data){			
						bets.update({'`wins`' : 'wins + 1', '`current_points`' : 'current_points + ' + points, '`total_points_won`' : 'total_points_won + ' + points}, conditionP1, function(data){
							bets.update({'`losses`' : 'losses + 1', '`current_points`' : 'current_points - ' + points, '`total_points_lost`' : 'total_points_lost + ' + points}, conditionP2, function(data){
							});
						});
					});	
				}
				else if (Judgement == "p2"){
					bets.updateBet({'result' : "'" + Judgement + "'"}, condition, function(data){
						bets.update({'`wins`' : 'wins + 1', '`current_points`' : 'current_points + ' + points, '`total_points_won`' : 'total_points_won + ' + points}, conditionP2, function(data){
							bets.update({'`losses`' : 'losses + 1', '`current_points`' : 'current_points - ' + points, '`total_points_lost`' : 'total_points_lost + ' + points}, conditionP1, function(data){
							});
						});
					});	
				}
			
			});
		}
								}
								else{
								bets.updateBet({'result' : "'draw'"}, condition, function(data){
								});
								}
							}
						}
					}

                var currentUsername = localStorage.getItem("currentUsername");
                var currentUserID = localStorage.getItem("currentUserID");
                //console.log(currentUserID);
                
                var homeDataObj = {};

                bets.selectWhereOrAndAndNull("p1_id", currentUserID, "p2_id", currentUserID, "p2_agree", 1, "result", function(userBetsData){
                	//console.log(userBetsData);
                	homeDataObj.bets = userBetsData;

                	bets.selectNegativeJoinBetsVotes(currentUserID, function(communityBetsData){
                		//console.log(communityBetsData);

                		var expireDateArr = [];

                		for (j = 0; j < communityBetsData.length; j++) {
	                		//console.log(communityBetsData[0].create_date);
	                		var createDateSQL = (communityBetsData[j].create_date);
	                		//console.log(createDateSQL);
	                		//console.log(createDateSQL.toISOString());

	                		var createDateISO = createDateSQL.toISOString();
	                		var createDateMoment = moment(createDateISO);
	                		var expireDate = moment(createDateISO).add(2, 'day').format("YYYY/MM/DD HH:mm:ss");
	                		//console.log(expireDate);
	                		expireDateArr.push(expireDate);
                		}

                		console.log(expireDateArr);

                		homeDataObj.users = communityBetsData;

	            		bets.selectWhereUsers("user_id", currentUserID, function(userData){                			
	        				//console.log(userData);

	        				homeDataObj.usersStats = userData;

			                var hbsObject = {
			                	currentUsername: currentUsername,
			                	currentBets: userBetsData,
			                	userData: userData,
			                	communityBets: communityBetsData,
			                	expireDateArr: expireDateArr
			                }

			                //console.log(hbsObject);
							
							res.render("home", hbsObject);								
	            		})
            		})
                })

					});
				});




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
                var currentUserID = localStorage.getItem("currentUserID");
                //console.log(currentUserID);
                
                var myBetsDataObj = {};
                var tempArr =[];


				bets.userData("users", function(resData){
					console.log(resData);
					myBetsDataObj.userData = resData;
				});

                bets.selectWhereAndAndNull("p3_id", currentUserID, "p2_agree", 1, "result", function(judgingBetsData){
                	//console.log(judgingBetsData);
                	myBetsDataObj.judgingBets = judgingBetsData;
                	
                	bets.selectWhereAndNull("p2_id", currentUserID, "p2_agree", function(pendingBetsData){
                		//console.log(pendingBetsData);
                		myBetsDataObj.pendingBets = pendingBetsData;

	            		bets.selectWhereOrAndAndNull("p1_id", currentUserID, "p2_id", currentUserID, "p2_agree", 1, "result", function(currentBetsData){             			
	        				console.log(currentBetsData);

	        				for (k = 0; k < currentBetsData.length; k++) {

	        					if (currentBetsData[k].p1_id == currentUserID) {
	        						currentBetsData[k].yourAnswer = currentBetsData[k].p1_answer;
	        						currentBetsData[k].opponentAnswer = currentBetsData[k].p2_answer;
	        					}
	        					else if (currentBetsData[k].p2_id == currentUserID) {
	        						currentBetsData[k].yourAnswer = currentBetsData[k].p2_answer;
	        						currentBetsData[k].opponentAnswer = currentBetsData[k].p1_answer;
	        					}

	        					if (currentBetsData[k].judge == "friend") {
	        						for (l = 0; l < myBetsDataObj.userData.length; l++) {
	        							if (currentBetsData[k].p3_id == myBetsDataObj.userData[l].user_id) {
	        								currentBetsData[k].judgeText = myBetsDataObj.userData[l].username + " (Friend)";
	        							}
	        						}
	        							
	        					} else if (currentBetsData[k].judge == "admin"){
	        						currentBetsData[k].judgeText = "Admin";
	        					} else if (currentBetsData[k].judge == "community"){
	        						currentBetsData[k].judgeText = "Community";
	        					}
	        				}

	        				myBetsDataObj.currentBets = currentBetsData;

		            		bets.selectWhereOrAndNotNull("p1_id", currentUserID, "p2_id", currentUserID, "result", function(pastBetsData){             			
		        				//console.log(pastBetsData);

		        				myBetsDataObj.currentBets = pastBetsData;

				                var hbsObject = {
				                	currentUsername: currentUsername,
				                	judgingBets: judgingBetsData,
				                	pendingBets: pendingBetsData,
				                	currentBets: currentBetsData,
				                	pastBets: pastBetsData
				                }

				                //console.log(hbsObject);
								
								res.render("myBets", hbsObject);	
		            		})
	            		})
            		})
                })
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
		res.redirect('/index'); 

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

		if (req.body.judge == "friend") {

			var usernameP1 = req.body.usernameP1;
			var usernameP2 = req.body.usernameP2;
			var usernameP3 = req.body.usernameP3;

			bets.userData("users", function(resData){
				console.log(resData);

				usernameExistsP1 = false;
				usernameExistsP2 = false;
				usernameExistsP3 = false;

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
					if (resData[i].username == usernameP3){
						usernameExistsP3 = true;
						var userIdP3 = resData[i].user_id;
					}
				}

				if (usernameExistsP1 == true && usernameExistsP2 == true && usernameExistsP3 == true) {

					if (userPointsP1 - req.body.points >= 0 && userPointsP2 - req.body.points >= 0){

						bets.insertBet(['p1_id', 'p2_id', 'p3_id', 'p1_answer', 'bet_amount', 'bet_text','judge'], [userIdP1, userIdP2, userIdP3, req.body.P1answer, req.body.points, req.body.betText, req.body.judge], function(data){
						
							var redirectObj = {
								isCreated: true,
								path: "/home"
							};

							res.json(redirectObj);	
						})
					}
					else {
						var redirectObj = {
							isCreated: false,
							usernameExistsP1: usernameExistsP1,
							usernameExistsP2: usernameExistsP2,
							userPointsP1: userPointsP1,
							userPointsP2: userPointsP2
						}

						res.json(redirectObj);
					}
				}
				else {
					var redirectObj = {
						isCreated: false,
						usernameExistsP1: usernameExistsP1,
						usernameExistsP2: usernameExistsP2,
						usernameExistsP3: usernameExistsP3,
						userPointsP1: userPointsP1,
						userPointsP2: userPointsP2
					}

					res.json(redirectObj);
				}
			})
		}

		else {

			console.log("This is without friend judge")
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

					if (userPointsP1 - req.body.points >= 0 && userPointsP2 - req.body.points >= 0){

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
							isCreated: false,
							usernameExistsP1: usernameExistsP1,
							usernameExistsP2: usernameExistsP2,
							userPointsP1: userPointsP1,
							userPointsP2: userPointsP2
						}

						res.json(redirectObj);
					}
				} 
				else {
					var redirectObj = {
						isCreated: false,
						usernameExistsP1: usernameExistsP1,
						usernameExistsP2: usernameExistsP2,
						userPointsP1: userPointsP1,
						userPointsP2: userPointsP2
					}

					res.json(redirectObj);
				}
			})
		}
	});

	app.put('/api/acceptBet/:id', function(req,res) {
		var condition = 'bet_id = ' + req.params.id;
		
		console.log("GOT TO ACCEPT BET");

		if (req.body.agree == "true"){
			//console.log("they agreed to the bet");

			bets.updateBet({'p2_answer' : "'" + req.body.P2answer + "'", 'p2_agree' : 1}, condition, function(data){
				res.json("accepted");
				//res.redirect('/home');
			});
		}
		else{
			//console.log("they declined the bet");

			bets.updateBet({'result' : "'draw'", 'p2_agree' : 0}, condition, function(data){
				res.json("declined");
				//res.redirect('/home');
			});
		}

	});


	app.put('/api/judgeBet/:id', function(req,res) {
		var condition = 'bet_id = ' + req.params.id;
		
		console.log("GOT TO JUDGE BET");
		
		var Judgement = req.body.judgement;
		
		if (Judgement == "draw"){
		bets.updateBet({'result' : "'" + Judgement + "'"}, condition, function(data){
				res.json("judged");
				//res.redirect('/home');
			});	
		}
		else {
			bets.betJudge("bets", function(resData){
				
				var conditionP1;
				var conditionP2;
				
				var points;

				for (i = 0; i < resData.length; i++) {
					if (resData[i].bet_id == req.params.id) {
						points = resData[i].bet_amount;
						conditionP1 = 'user_id = ' + resData[i].p1_id;
						conditionP2 = 'user_id = ' + resData[i].p2_id;
					}
				}
				
				if (Judgement == "p1"){	
					bets.updateBet({'result' : "'" + Judgement + "'"}, condition, function(data){			
						bets.update({'`wins`' : 'wins + 1', '`current_points`' : 'current_points + ' + points, '`total_points_won`' : 'total_points_won + ' + points}, conditionP1, function(data){
							bets.update({'`losses`' : 'losses + 1', '`current_points`' : 'current_points - ' + points, '`total_points_lost`' : 'total_points_lost + ' + points}, conditionP2, function(data){
								res.json("judged");
							});
						});
					});	
				}
				else if (Judgement == "p2"){
					bets.updateBet({'result' : "'" + Judgement + "'"}, condition, function(data){
						bets.update({'`wins`' : 'wins + 1', '`current_points`' : 'current_points + ' + points, '`total_points_won`' : 'total_points_won + ' + points}, conditionP2, function(data){
							bets.update({'`losses`' : 'losses + 1', '`current_points`' : 'current_points - ' + points, '`total_points_lost`' : 'total_points_lost + ' + points}, conditionP1, function(data){
								res.json("judged");
							});
						});
					});	
				}
			
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