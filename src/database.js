const mysql = require('mysql')
const dotenv = require('dotenv').config()

const mysqlConnection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database: process.env.DB_NAME
})

mysqlConnection.connect((err)=>{
    if(err) throw err
    else console.log('conectado')
})


module.exports = mysqlConnection