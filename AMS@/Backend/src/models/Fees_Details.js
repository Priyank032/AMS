const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const FeesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Father_name:{
        type:String,
        required:true
    },
    Class:{
        type:Number,
        required:true
    },
    Section:{
        type:String,
        default: null
    },
    Submitted_Fees:{
        type:Number,
        required:true,
    },
    
    institutionId:{
        type:String,
         required:true
    },   
},
{ timestamps: true }
)


const FeesManagement = new mongoose.model("FeesManagement",FeesSchema)
module.exports = FeesManagement