const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mmysqlConnection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : '',
    database : 'employeedb'
});

mmysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection succeded.');
    else
    console.log('DB connection failed \n Error : '+JSON.stringify(err, undefined, 2));
});

app.listen(3000,()=>console.log('Express sercer is running at port no : 3000'));

//Get all employees
app.get('/employee',(res,req)=>{
    mmysqlConnection.query('SELECT * FROM employee',(err, rows, fields)=>{
        if(!err)
        console.log(rows[0].EmpID);
        else
        console.log(err);
    })
});