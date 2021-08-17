const mysql = require('mysql2');
const express = require('express');
const router = express.Router();
const { printTable } = require('console-table-printer');

const PORT = process.env.PORT || 3001;
const app = express();
const inquirer = require('inquirer');

let connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Biihbitoodni2017!',
        database: 'employee_db'
    },
    console.log('Connected to employee_db.')
);

connection.connect((error) => {
    if (error) {
        throw error
    }

    menu()
});
//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

function menu() {
    inquirer.prompt({
            type: 'list',
            message: 'What would like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
            name: 'selection'
        })
        .then(response => {
            if (response.selection === 'view all departments') {
                viewDepartments()
            }
            if (response.selection === 'view all roles') {
                viewRoles()
            }
            if (response.selection === 'view all employees') {
                viewEmployees()
            }
            if (response.selection === 'add a department') {
                addDepartment()
            }
            if (response.selection === 'add a role') {
                addRole()
            }
            if (response.selection === 'add an employee') {
                addEmployee()
            }
            if (response.selection === 'update an employee role') {
                updateEmployeeRole()
            }
        })
}

function updateEmployeeRole() {
    inquirer.prompt([{
        type: 'list',
        message: "What is the role you want to update?",
        name: 'roleId',
        choices: [1, 2, 3, 4, 5, 6, 7],
    }, {
        type: 'input',
        message: 'what is your new title?',
        name: 'title'
    }, {
        type: 'input',
        message: 'what is your new salary?',
        name: 'salary'
    }]).then(response => {
        connection.query('update role set title = ?, salary = ? where id = ?', [response.title, response.salary, response.roleId], (err, data) => {
            console.log('role updated')
            menu()
        })
    })
}

function addEmployee() {
    inquirer.prompt([{
            type: 'input',
            message: 'what is employees first name ? ',
            name: 'first'
        }, {
            type: 'input',
            message: 'what is employees last name?',
            name: 'last'
        }, {
            type: 'choices',
            message: 'what is employees new role?',
            name: 'role_id'
        }])
        .then(response => {
            connection.query('INSERT INTO employee (first_name, last_name, role_id)VALUES(?, ?, ?)', [response.first, response.last, response.role_id], (err, data) => {
                console.log('new employee has been added')
                menu()
            })
        })
}


function addRole() {
    inquirer.prompt([{
            type: 'input',
            message: 'what is your title?',
            name: 'title'
        }, {
            type: 'input',
            message: 'what is your salary?',
            name: 'salary'
        }, {
            type: 'input',
            message: 'what is your department id?',
            name: 'departmentId'
        }])
        .then(response => {
            connection.query('INSERT INTO role (title, salary, department_id)VALUES(?, ?, ?)', [response.title, response.salary, response.departmentId], (err, data) => {
                console.log('new role has been added')
                menu()
            })
        })
}

function addDepartment() {

    inquirer.prompt([{
            type: 'input',
            message: 'what is the new deparment name?',
            name: 'departmentName'
        }])
        .then(response => {
            connection.query('INSERT INTO department (name)values(?)', response.departmentName, (error, data) => {
                console.log('new department has been added')
                menu()
            })

        })



}

function viewEmployees() {
    connection.query('SELECT * FROM employee', (error, data) => {
        printTable(data)
        menu()
    })
}

function viewRoles() {
    connection.query('Select * from role', (error, data) => {
        printTable(data)
        menu()
    })
}

function viewDepartments() {
    connection.query('select * from department', (error, data) => {
        printTable(data)
        menu()
    })
}


console.log(PORT);

//view all employees
// TODO - Use router.get() vs app.get()?
app.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employee`;
    const params = [req.params.id];

    connection.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

//view single employee
app.get('/employees/:id', (req, res) => {
    const sql = `SELECT * FROM employee WHERE id = ?`;
    const params = [req.params.id];

    connection.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

//view all roles
router.get('/candidates', (req, res) => {
    const sql = `SELECT roles.*, employees.name
    AS party_name
    FROM employees
    LEFT JOIN parties
    ON employees.party_id = parties.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//view a single role
router.get('/voter/:id', (req, res) => {
    const sql = `SELECT * FROM voters WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

//create a department
app.post('/api/department', ({ body }, res) => {
    const errors = inputCheck(body, 'name');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
});

//view a single department
app.get('/api/department/:id', (req, res) => {
    const sql = `SELECT * FROM department WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

//view all departments
app.get('/api/department', (req, res) => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});


//create an employee
app.post('/employee', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO employee (first_name, last_name)
  VALUES (?,?)`;
    const params = [body.first_name, body.last_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});




//create a role??
app.post('/api/role', ({ body }, res) => {
    const errors = inputCheck(body, 'title', 'salary');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
});


//universal default response for any other request
app.use((req, res) => {
    res.status(404).end();
});

module.exports = router

//Express server function
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});