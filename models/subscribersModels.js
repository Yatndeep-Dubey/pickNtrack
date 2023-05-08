const { query } = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const subscriberSchema= new Schema({
    email:
    {
        type:String
    },

})
module.exports=mongoose.model("subscriberModel",subscriberSchema)