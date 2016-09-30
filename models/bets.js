var orm = require('../config/orm.js');

var bets = {
	selectAll: function(callback) {
		orm.selectAll('products', function(res){
			callback(res);
		});
	},
	insertOne:  function(cols, vals, callback) {
		orm.insertOne('products', cols, vals, function(res){
			callback(res);
		});
	},
	update: function(objColVals, condition, callback) {
		orm.updateOne('users', objColVals, condition, function(res){
			callback(res);
		});
	},
	auth: function(username, callback) {
		orm.updateOne('users', username, function(res){
			callback(res);
		});
	}
};

module.exports = bets;