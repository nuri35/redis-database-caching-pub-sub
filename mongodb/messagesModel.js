const mongoose = require("mongoose")
const {Schema} = mongoose
const {Types} = Schema
const {ObjectId} = Types


const messagesSchema =  new Schema({
   
    message:{
        type:String,
        required:true,
        trim:true
    }
},{
_id:true,
timestamps:true,
collection:"messages",
toJSON:{
    transform(doc,ret){
        delete ret.__v;
        return ret
    }
},
})

const Messages = mongoose.model("messages",messagesSchema)

module.exports = Messages