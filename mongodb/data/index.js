const Messages = require("./../messagesModel")

const MessagesData = require("./messages") 


const exampleDataInformation = async()=>{

const messageCount = await Messages.estimatedDocumentCount();

try{
    if(messageCount <= 0){
        
        console.log("writing messages")
        await Messages.create(MessagesData)
        console.log("written messages")
    }
}catch(err){
    console.log(err)
}


}

module.exports = exampleDataInformation