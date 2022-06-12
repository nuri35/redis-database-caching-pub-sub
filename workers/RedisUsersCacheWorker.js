const mongoose = require("mongoose")
const client = require("./../redis/index")
const Messages = require("./../mongodb/messagesModel")


const stopForMs = (ms)=>{
return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve()
    },ms)
})
}
//1.sayfadakı mesajalr 2.sayfadakı mesajlar vs sistem başlarken cache yapma senaryosu
const RedisMessagesCacheWorker = async(page = 0,batch = 50)=>{

const messages = await Messages.find({}).skip(page * batch).limit(batch).lean()

if(messages.length === 0){
    return true
}
console.log("page:",page + 1 ,"Batch of ", batch, "is adding  to cache")

await client.set(`messages/${page + 1}/${batch}`,JSON.stringify(messages),{
    EX:60,
    NX:false,
    KEEPTTL:false
})
        await stopForMs(1000)
        return await RedisMessagesCacheWorker(page + 1,batch)

}

module.exports = RedisMessagesCacheWorker;