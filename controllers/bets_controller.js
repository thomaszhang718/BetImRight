var express = require('express');
var router = express.Router();
var bets = require('../models/bets.js');

router.get('/', function(req,res) {
	res.redirect('/bets')
});

router.get('/bets', function(req,res) {
	bets.selectAll(function(data){
		var hbsObject = {products : data}
		console.log(hbsObject)
		res.render('index', hbsObject);
	});
});

router.post('/bets/create', function(req,res) {
	var dateNew = new Date();
	var date = dateNew.getDate() + "," + (dateNew.getMonth() + 1) + "," + dateNew.getFullYear();
	console.log(date);
	bets.insertOne(['burgerName', 'date'], [req.body.name, date], function(data){
		res.redirect('/bets')
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
