const mongoose = require("mongoose")

const TagSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  descreption:{
    type:String,
    
  },
  course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
  }
})

module.exports = mongoose.model("Tag", TagSchema)