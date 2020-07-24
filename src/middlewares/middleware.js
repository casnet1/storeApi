const jwt = require('jwt-simple')
const moment = require('moment')

const checkToken = (req,res,next)=>{
    if(!req.headers['user_token'])
    return res.json({
        error:"tienes que incluir el token"
    })

    const token = req.headers['user_token']
    let payload = null
    try{
        payload = jwt.decode(token,process.env.TOKEN)
        console.log(payload)

    }
    catch(err){
     return res.json({
         error:'token invalido'
     })   
    }

    if(moment.unix() > payload.expire){
        return res.json({ error:'token expirado'})
    }

    req.userId = payload.userId

    next()


}


module.exports ={
    checkToken:checkToken
}