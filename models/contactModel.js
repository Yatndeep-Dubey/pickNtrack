const { query } = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema= new Schema({
    name:{
        type:String
    },
    email:
    {
        type:String
    },
    phone:
    {
        type:Number
    },
    countrycode:
    {
        type:String
    },
    location:
    {
        type:String
    },
    queryusr:{
         type:String
    },
    message:
    {
       type:String
    },
    date:
    {
        type:String
    }


})
module.exports=mongoose.model("contactModel",contactSchema)