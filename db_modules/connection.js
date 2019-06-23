var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'socialbox'
});

module.exports = conn;