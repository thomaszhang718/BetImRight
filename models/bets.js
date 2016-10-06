var orm = require('../config/orm.js');

var bets = {
	selectAll: function(callback) {
		orm.selectAll('users', function(res){
			callback(res);
		});
	},
	insertOne:  function(cols, vals, callback) {
		orm.insertOne('users', cols, vals, function(res){
			callback(res);
		});
	},
	insertBet:  function(cols, vals, callback) {
		orm.insertOne('bets', cols, vals, function(res){
			callback(res);
		});
	},
	update: function(objColVals, condition, callback) {
		orm.updateOne('users', objColVals, condition, function(res){
			callback(res);
		});
	},
	userAuth: function(table, callback) {
		orm.userAuth(table, function(res){
			callback(res);
		});

	},
	userData: function(table, callback) {
		orm.userAuth(table, function(res){
			callback(res);
		});
	},
	commBets: function(callback) {
		orm.selectAll('bets', function(res){
			
			var community = {
				bets: []
			};

			for (var i = 0; i < bets.length; i++){
				if (bets.judge == "community" && bets.result == null){
					community.bets.push(bets.bet_text);	
				}
			}
			callback(community);
		});
	}
};

module.exports = bets;