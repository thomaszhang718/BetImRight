/*var mysql = require('mysql');

var connection;

//If JAWSDB present

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}

//Use local MySQL 

else {
    connection = mysql.createConnection({
        
        //Will need to change password to match your local MySQL settings
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: '12345', //12345
        database: 'bets_db'
    });
}

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;*/

// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

var mysql = require('mysql');

var source = {

    localhost: {
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: "123456t",
        database: "burgers_db"
    },

    jawsDB: {
        port: 3306,
        host: 'uoa25ublaow4obx5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'f6fzr3rzzsl2z76f',
        password: "vi2o9a4qmbk6xs3k",
        database: "xt8w3b7ov2wm8tua"
    }
}

var connection = mysql.createConnection(source.jawsDB);


connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;