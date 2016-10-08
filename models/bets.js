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
	insertVote:  function(cols, vals, callback) {
		orm.insertOne('votes', cols, vals, function(res){
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
	betData: function(table, callback) {
		orm.betData(table, function(res){
			callback(res);
		});
	},
	betJudge: function(table, callback) {
		orm.betJudge(table, function(res){
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
  	selectWhereVotes: function(colToSearch, valOfCol, callback) {
		orm.selectWhere('votes', colToSearch, valOfCol, function(res){
			callback(res);
		});
    },
	selectWhereBetsOr: function(colToSearch, colToSearch2, valOfCol, callback) {
		orm.selectWhereOr('bets', colToSearch, colToSearch2, valOfCol, function(res){
			callback(res);
		});
	},
	selectWhereBetsAnd: function(colToSearch, valOfCol, colToSearch2, valOfCol2, callback) {
		orm.selectWhereAnd('bets', colToSearch, valOfCol, colToSearch2, valOfCol2, function(res){
			callback(res);
		});
	},
	selectWhereAndNull: function(colToSearch, valOfCol, colToSearch2, callback) {
		orm.selectWhereAndNull('bets', colToSearch, valOfCol, colToSearch2, function(res){
			callback(res);
		});
	},
	selectWhereAndAndNull: function(colToSearch, valOfCol, valOfCol2, colToSearch2, colToSearch3, callback) {
		orm.selectWhereAndAndNull('bets', colToSearch, valOfCol, valOfCol2, colToSearch2, colToSearch3, function(res){
			callback(res);
		});
	},
	selectWhereOrAndAndNull: function(colToSearch, valOfCol, colToSearch2, valOfCol2, colToSearch3, valOfCol3, colToSearch4, callback) {
		orm.selectWhereOrAndAndNull('bets', colToSearch, valOfCol, colToSearch2, valOfCol2, colToSearch3, valOfCol3, colToSearch4, function(res){
			callback(res);
		});
	},
	selectWhereOrAndNotNull: function(colToSearch, valOfCol, colToSearch2, valOfCol2, colToSearch3, callback) {
		orm.selectWhereOrAndNotNull('bets', colToSearch, valOfCol, colToSearch2, valOfCol2, colToSearch3, function(res){
			callback(res);
		});
	}


};

module.exports = bets;