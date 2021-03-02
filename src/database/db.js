var mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dev',
    password: 'dev',
    database: 'mrm'
});

connection.connect((err) => {
    if (err) throw err;
});


module.exports = connection;