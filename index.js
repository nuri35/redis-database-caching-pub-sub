require("express-async-errors")
const express = require("express")
const app = express()
const helmet = require("helmet")
const bodyParser = require("body-parser")
const RouterArrFns = require("./routes/index")
const req = require("express/lib/request")

const router = express.Router();
const client = require("./redis/index")

RouterArrFns.forEach((routerFn,index)=>{
    routerFn(router)
})

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json({limit:"50mb",extended:true})) 

app.use('/api',router)


//state durum baglantının durumuyla ılgılı 
client.on("connect", ()=>{
console.log("redis client connected")
})


client.on("error", (err)=>{
    console.log("redis client error",err)
    })

 //baglantıyı gerçeklestırelım
client.connect().then(()=>{
console.log("client connected")
}).catch(err =>{
    console.log(err)
})

const server = app.listen(7000,()=>{
    console.log("bu port dınlenıyor: " + 7000)
})


module.exports = server
