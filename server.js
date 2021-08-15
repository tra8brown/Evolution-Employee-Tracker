const mysql = require('mysql2');
const express = require('express');
const router = express.Router();

const PORT = process.env.PORT || 3001;
const app = express();

let connection = mysql.createConnection({
        host: 'localhost',
        // port: 3301,
        user: 'root',
        password: 'Biihbitoodni2017!',
        database: 'employee_db'
    },
    console.log('Connected to employee_db.')
);

connection.connect();

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