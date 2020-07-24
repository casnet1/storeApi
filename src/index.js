const express = require('express')
const app = express()
var cors = require('cors')

//configuracion 
app.use(cors()) // Use this after the variable declaration
app.set('port',process.env.PORT || 3000);




//middlewares (antes de que se ejecute de alguna peticion)
app.use(express.json()) 

//routes
app.use(require('./routes/routes'))


//servidor

app.listen(app.get('port'), ()=>{
    console.log('server en linea en',app.get('port'))
})
