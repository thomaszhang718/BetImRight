var connection = require('../config/connection.js');

function printQuestionMarks(num){
  var arr = [];

  for (var i=0; i<num; i++){
    arr.push('?')
  }

  return arr.toString();
}

function objToSql(ob){

  var arr = [];

  for (var key in ob) {
    arr.push(key + '=' + ob[key]);
  }

  return arr.toString();
}

var orm = {
  selectAll: function(table, callback) {
        var queryString = 'SELECT * FROM ' + table + ';';
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            callback(result);
        });
    },

	insertOne: function(table, cols, vals, callback) {
      var queryString = 'INSERT INTO ' + table;

      queryString = queryString + ' (';
      queryString = queryString + cols.toString();
      queryString = queryString + ') ';
      queryString = queryString + 'VALUES (';
      queryString = queryString + printQuestionMarks(vals.length);
      queryString = queryString + ') ';

      console.log(queryString);
	  console.log(vals);

      connection.query(queryString, vals, function(err, result) {
        if (err) throw err;
        callback(result);
      });
    },

	updateOne: function(table, objColVals, condition, callback) {
      var queryString = 'UPDATE ' + table;

      queryString = queryString + ' SET ';
      queryString = queryString + objToSql(objColVals);
      queryString = queryString + ' WHERE ';
      queryString = queryString + condition;

      console.log(queryString)
      connection.query(queryString, function(err, result) {
        if (err) throw err;
        callback(result);
      });
    },
	
	userAuth: function(table, callback) {
        var queryString = 'SELECT * FROM ' + table + ";";
        //console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            callback(result);
        });
    },

	userData: function(table, callback) {
        var queryString = 'SELECT * FROM ' + table + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            callback(result);
        });
  },

	betData: function(table, callback) {
        var queryString = 'SELECT * FROM ' + table + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            callback(result);
        });
  },

  betJudge: function(table, callback) {
        var queryString = 'SELECT * FROM ' + table + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            callback(result);
        });
  },

  betCommunity: function(table, callback) {
        var queryString = 'SELECT * FROM ' + table + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            callback(result);
        });
  },

  selectNegativeJoin: function(valOfCol, callback) {
        var queryString = "SELECT * FROM bets WHERE bets.judge='community' AND bets.result IS NULL AND NOT EXISTS (SELECT * FROM votes WHERE votes.bet_id = bets.bet_id AND votes.voter_id=" + valOfCol + ")";
        //console.log(queryString);

        connection.query(queryString, function(err, result) {
            callback(result)
        });

    },

  selectWhere: function(tableInput, colToSearch, valOfCol, callback) {
        var queryString = 'SELECT * FROM ' + tableInput + ' WHERE ' + colToSearch + ' = ?';
        // console.log(queryString);

        connection.query(queryString, [valOfCol], function(err, result) {
            callback(result)
        });

    },

  selectWhereOr: function(tableInput, colToSearch, colToSearch2, valOfCol, callback) {
        var queryString = 'SELECT * FROM ' + tableInput + ' WHERE ' + colToSearch + ' = ' + valOfCol + ' OR ' + colToSearch2 + ' = ' + valOfCol;
        // console.log(queryString);

        connection.query(queryString, function(err, result) {
            callback(result)
        });

    },

  selectWhereAnd: function(tableInput, colToSearch, valOfCol, colToSearch2, valOfCol2, callback) {
        var queryString = 'SELECT * FROM ' + tableInput + ' WHERE ' + colToSearch + ' = ' + valOfCol + ' AND ' + colToSearch2 + ' = ' + valOfCol2;
        // console.log(queryString);

        connection.query(queryString, function(err, result) {
            callback(result)
        });

    },

  selectWhereAndNull: function(tableInput, colToSearch, valOfCol, colToSearch2, callback) {
        var queryString = 'SELECT * FROM ' + tableInput + ' WHERE ' + colToSearch + ' = ' + valOfCol + ' AND ' + colToSearch2 + ' IS NULL';
        //console.log(queryString);

        connection.query(queryString, function(err, result) {
            callback(result)
        });

    },

  selectWhereAndAndNull: function(tableInput, colToSearch, valOfCol, valOfCol2, colToSearch2, colToSearch3, callback) {
        var queryString = 'SELECT * FROM ' + tableInput + ' WHERE ' + colToSearch + ' = ' + valOfCol + ' AND ' + colToSearch2 + ' = ' + valOfCol2  + ' AND ' + colToSearch3 + ' IS NULL';
        //console.log(queryString);

        connection.query(queryString, function(err, result) {
            callback(result)
        });

    },

  selectWhereOrAndAndNull: function(tableInput, colToSearch, valOfCol, colToSearch2, valOfCol2, colToSearch3, valOfCol3, colToSearch4, callback) {
        var queryString = 'SELECT * FROM ' + tableInput + ' WHERE (' + colToSearch + ' = ' + valOfCol + ' OR ' + colToSearch2 + ' = ' + valOfCol2 + ') AND ' + colToSearch3 + ' = ' + valOfCol3  + ' AND ' + colToSearch4 + ' IS NULL';
        //console.log(queryString);

        connection.query(queryString, function(err, result) {
            callback(result)
        });

    },

  selectWhereOrAndNotNull: function(tableInput, colToSearch, valOfCol, colToSearch2, valOfCol2, colToSearch3, callback) {
        var queryString = 'SELECT * FROM ' + tableInput + ' WHERE (' + colToSearch + ' = ' + valOfCol + ' OR ' + colToSearch2 + ' = ' + valOfCol2 + ') AND ' + colToSearch3 + ' IS NOT NULL';
        //console.log(queryString);

        connection.query(queryString, function(err, result) {
            callback(result)
        });

    }






};

module.exports = orm;
