const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mmysqlConnection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : '',
    database : 'employeedb',
    multipleStatements: true
});

mmysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection succeded.');
    else
    console.log('DB connection failed \n Error : '+JSON.stringify(err, undefined, 2));
});

app.listen(3000,()=>console.log('Express sercer is running at port no : 3000'));

//Get all employees
app.get('/employee',(req,res)=>{
    mmysqlConnection.query('SELECT * FROM employee',(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//Get an employee
app.get('/employee/:id',(req,res)=>{
    mmysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//Delete an employee
app.delete('/employee/:id',(req,res)=>{
    mmysqlConnection.query('DELETE FROM employee WHERE EmpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send('Deleted successfully.');
        else
        console.log(err);
    })
});

//Insert an employee
app.post('/employee',(req,res)=>{
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?;\
    CALL employeeAddorEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mmysqlConnection.query(sql , [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],(err, rows, fields)=>{
        if(!err)
        res.send('Updated successfully');
        else
        console.log(err);
    })
});