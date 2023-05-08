const { query } = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema= new Schema({
    
    username:
    {
        type:String
    },
    pass:
    {
        type:String
    }

})
module.exports=mongoose.model("adminModel",adminSchema)