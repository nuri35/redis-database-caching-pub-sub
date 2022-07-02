require("express-async-errors");
const express = require("express");
const app = express();
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const RouterArrFns = require("./routes/index");
const Models = require("./mongodb/messagesModel");
const exampleDataInformation = require("./mongodb/data/index");
const router = express.Router();
const client = require("./redis/index");
const cron = require("node-cron");

let redisConnected = false;
let mongoConnected = false;

const RedisMessagesCacheWorker = require("./workers/RedisUsersCacheWorker");

RouterArrFns.forEach((routerFn, index) => {
  routerFn(router);
});

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.use("/api", router);

//state durum baglantının durumuyla ılgılı
client.on("connect", () => {
  console.log("redis client connected");
});

client.on("error", (err) => {
  console.log("redis client error", err);
});

//baglantıyı gerçeklestırelım
client
  .connect()
  .then(() => {
    console.log("client connected");
    redisConnected = true;
  })
  .catch((err) => {
    console.log(err);
  });

//mongoo connect

mongoose
  .connect("mongodb://localhost:27017/redis")
  .then(async () => {
    console.log("mongodb connected");
    mongoConnected = true;
    await exampleDataInformation();
  })
  .catch((err) => {
    console.log(err);
  });

// cron.schedule('* * * * * ',()=>{
//     if(redisConnected && mongoConnected){
//         RedisMessagesCacheWorker().then((res)=>{
//             if(res){
//                 console.log("users are synchorized with redis cache system")
//             }
//         }).catch(err=>{
//             console.log(err)
//         })

//     }else{
//         console.log("you can run the worker because of connectıon not established")
//     }

// })

const server = app.listen(7000, () => {
  console.log("bu port dınlenıyor: " + 7000);
});

module.exports = server;
