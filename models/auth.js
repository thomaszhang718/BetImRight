var bets = require('../models/bets.js');
var Cookies     = require('cookies');
var jwt         = require('jsonwebtoken'); 

module.exports = function(app){

	app.post('/api/auth', function(req, res){
        console.log("Okay!");
		var username = req.body.username;
		var password = req.body.password;
		
		bets.auth(username, function(data){
			
		for (i in data.body){

			if (data.body.username == username && data.body.password == password){

				var token = jwt.sign(admin, app.get('jwtSecret'), {
					expiresIn: 1440
				})

				new Cookies(req, res).set('access_token', token, {
					httpOnly: true,
					secure: false
					});

				console.log("Cookie Sent")

				res.json({
					success: true,
					message: "Access granted. Proceed to the holy gateway of our API. Just be sure to use the token!",
				});

			}
		}
		else{
            console.log("No Cookie Sent")
			res.send("Sorry Bro. I know you just want friends. But your access is denied.")
		}
		});
	});

    app.all('*', function(req, res, next) {

        var token = new Cookies(req, res).get('access_token');

        console.log(token);

        jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
            if (err) {

                console.log("bad cookie");

                return res.json({success: false, message: "access denied. Bro. Did you even send me a token?"})
            }
            else {

                console.log("good cookie");

                next();
            }
        })
    })
}