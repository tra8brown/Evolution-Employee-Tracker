const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

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

// middleware goes here???

//view all employees

//view single employee

//view all roles
case "view all roles":
    view.viewRoles(connection, start);
    break
    //view a single role

    //view all departments

    //view a single department

    //create an employee

    //create a department

    //create a role??

    //universal default response for any other request

    //Express server function
    app.listen(PORT, () => {
        console.log('Server running on port ${PORT}');
    });