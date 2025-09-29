const mongoose = require("mongoose")
const {Schema, model} = require("mongoose")


const eventSchema = new Schema({
    userId:{
         type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Title:{
        type:String,
        required:true
    },
    DateAndTime:{
        type:Date,
        required:true
    },
    Location:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        
    }
})

const Event = model("Event", eventSchema);

  module.exports = {Event};