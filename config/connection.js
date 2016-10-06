var mysql = require('mysql');

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
        password: '12345',
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

module.exports = connection;