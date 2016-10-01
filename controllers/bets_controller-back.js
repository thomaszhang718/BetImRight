var express = require('express');
var router = express.Router();
var bets = require('../models/bets.js');

router.post('/createUser/create', function(req,res) {
	console.log(date);
	bets.insertOne(['burgerName', 'date'], [req.body.name, date], function(data){
		res.redirect('/createUser')
	});
});

router.put('/bets/update/:itemID', function(req,res) {
	var condition = 'itemID = ' + req.params.itemID;

	console.log('condition', condition);

	bets.update({'devoured' : req.body.devoured}, condition, function(data){
		res.redirect('/bets');
	});
});

module.exports = router;
