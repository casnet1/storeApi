const express = require('express')
const router = express.Router()

const mysqlConnection = require('../database')

const User = require('../models/users')
const midd = require('../middlewares/middleware')



router.use(midd.checkToken)

//peticion get a todos los productos 
router.get('/', (req,res)=>{
    mysqlConnection.query('SELECT * FROM products', (err,rows,fields)=>{

        if(!err){
            res.json(rows)
        }
        else throw err
    })
})





// router.get('/usersALL',(req,res)=>{
//     mysqlConnection.query('SELECT * FROM users', (err,rows)=>{

//         if(!err){
//             res.json(rows)
//         }
//         else throw err
//     })
// })

// router.get('/usersA',async (req,res)=>{
//     const users = await User.getAll()
//     res.json(users)
//     })



    

//peticion get para un unico producto
router.get('/:clave', (req,res)=>{
    const {clave} = req.params;
    console.log(clave)

    //en la consulta se prevee posible inyeccion de sql
    mysqlConnection.query('SELECT * FROM products WHERE clave = ?',[clave], (err,rows,fields)=>{

        if(!err){
            res.json(rows)
        }
        else throw err
    })
})


 router.post('/admin/',(req,res)=>{
    const {clave,nombre,precio,categoria,likes,img} = req.body
    mysqlConnection.query('CALL productFunctions(?,?,?,?,?,?)',[clave,nombre,precio,categoria,likes,img], (err,rows,fields)=>{
        if(!err) res.json({ Status:'producto agregado'})
        else throw err
    })
 })
 
 router.put('/admin/:clave', (req,res)=>{
    const {nombre,precio,categoria,likes,img} = req.body
    const {clave} = req.params;
    mysqlConnection.query('CALL productFunctions(?,?,?,?,?,?)',[clave,nombre,precio,categoria,likes,img], (err,rows,fields)=>{
        if(!err) res.json({ Status:'producto actualizado'})
        else throw err
    })
 })



 router.delete('/admin/del/:clave',(req,res)=>{
    const {clave} = req.params;
    mysqlConnection.query('DELETE FROM products WHERE clave = ?',[clave], (err,rows,fields)=>{
        if(!err) res.json({ Status:'producto eliminado'})
        else throw err
    })
 })



module.exports = router