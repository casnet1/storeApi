const mysqlConnection = require('../database')


const getAll = ()=>{
    return new Promise ((resolve,reject)=>{
        mysqlConnection.query('SELECT * FROM users', (err,rows)=>{
            if(err)    reject(err)
            resolve(rows)            
        })
    })    
}

const insert = (correo,pass,name)=>{
    return new Promise((resolve,reject)=>{
        mysqlConnection.query('INSERT INTO users (nombre,correo,pass) VALUES (?,?,?)',[name,correo,pass],(err,rows)=>{
            if(err) reject(err)
            resolve(rows)
        })

    })
}


const getEmail = (correo) =>{
    return new Promise((resolve,reject)=>{
        mysqlConnection.query('SELECT * FROM users WHERE correo = ?',[correo],(err,rows)=>{
            if(err) reject(err)
            resolve(rows[0])
        })
    })
}
const getId = (ID)=>{
    return new Promise((resolve,reject)=>{
        mysqlConnection.query('SELECT * FROM users WHERE id = ?',[ID],(err,rows)=>{
            if(err) reject(err)
            resolve(rows[0])
        })

    })
}




module.exports = {
    getAll: getAll,
    insert: insert,
    getEmail: getEmail,
    getId: getId
}