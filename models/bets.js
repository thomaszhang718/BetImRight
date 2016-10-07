var orm = require('../config/orm.js');

var bets = {
	selectAll: function(callback) {
		orm.selectAll('users', function(res){
			callback(res);
		});
	},
	selectAllBets: function(callback) {
		orm.selectAll('bets', function(res){
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
	updateBet: function(objColVals, condition, callback) {
		orm.updateOne('bets', objColVals, condition, function(res){
			callback(res);
		});
	},
	userAuth: function(table, callback) {
		orm.userAuth(table, function(res){
			callback(res);
		});
	},
	userData: function(table, callback) {
		orm.userData(table, function(res){
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

	},

	selectWhereUsers: function(colToSearch, valOfCol, callback) {
		orm.selectWhere('users', colToSearch, valOfCol, function(res){
			callback(res);
		});
	},

	selectWhereBets: function(colToSearch, valOfCol, callback) {
		orm.selectWhere('bets', colToSearch, valOfCol, function(res){
			callback(res);
		});
	},



	selectWhereBetsOr: function(colToSearch, colToSearch2, valOfCol, callback) {
		orm.selectWhereOr('bets', colToSearch, colToSearch2, valOfCol, function(res){
			callback(res);
		});
	}

};

module.exports = bets;