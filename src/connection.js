const mysql = require('mysql2');

let connection = mysql.createConnection({
        host: 'localhost',
        port: 3301,
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log('Connected to employee_db.')
);

connection.connect();

module.exports = connection;