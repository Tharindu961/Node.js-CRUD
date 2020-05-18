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

