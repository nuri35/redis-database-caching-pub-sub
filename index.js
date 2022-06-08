require("express-async-errors")
const express = require("express")
const app = express()
const helmet = require("helmet")
const bodyParser = require("body-parser")
const RouterArrFns = require("./routes/index")

const router = express.Router();

RouterArrFns.forEach((routerFn,index)=>{
    routerFn(router)
})

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json({limit:"50mb",extended:true})) 

app.use('/api',router)


const server = app.listen(7000,()=>{
    console.log("bu port dınlenıyor: " + 7000)
})


module.exports = server
