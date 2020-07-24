const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const moment = require('moment')

const mysqlConnection = require('../database')
const User = require('../models/users')
const midd = require('../middlewares/middleware')





router.get('/getAll',async (req,res)=>{
    let users = await User.getAll()
    res.json(users)
    })



    router.post('/singUP/',async (req,res)=>{
        const {correo,name} = req.body
        req.body.pass = bcrypt.hashSync(req.body.pass,10)
        let users = await User.insert(correo,req.body.pass,name)
    res.json(users)
     })


     router.post('/singIN', async(req,res)=>{
       
         const user = await User.getEmail(req.body.correo)
        if (user === undefined){
            res.json({
                error:'correo o contraseña no encontrada'
            })
        }
        else {
            let equales = bcrypt.compareSync(req.body.pass,user.pass)
            if (!equales){
                res.json({
                    error:'correo o contraseña no encontrada'
                })
            }
            else{
                res.json({
                    succesfull: crearToken(user),
                    done:'login correcto'
                })
            }
        }

     })

const crearToken = (user)=>{
    let payload ={
        userId: user.id,
        create: moment().unix(),
        expires:moment().add(1,'day').unix()
    }
    return jwt.encode(payload,process.env.TOKEN)
}





//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySSI6OCwiY3JlYXRlIjoxNTk1NTQwNjI2LCJleHBpcmVzIjoxNTk1NjI3MDI2fQ.uiLI_6DfXOvmKYjQON9ztPkeZ736We5HIZnejrR3WPkeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySSI6OCwiY3JlYXRlIjoxNTk1NTQwNjI2LCJleHBpcmVzIjoxNTk1NjI3MDI2fQ.uiLI_6DfXOvmKYjQON9ztPkeZ736We5HIZnejrR3WPkrouter.use(midd.checkToken)

router.get('/main',(req,res)=>{
    User.getId(req.userId)
    .then(rows =>{
        res.json({
            log:'bienvenido'
        })
    })
    .catch(err=> console.log(err))
})


module.exports = router