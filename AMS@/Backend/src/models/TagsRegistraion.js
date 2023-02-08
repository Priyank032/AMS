const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const youtube_Tags_Schema = new mongoose.Schema({ 
    Class:{
        type:Number,
        unique:true,
        required:true,
    }, 
    tags:{
        type:Array,
        
    }, 
})

const TagsRegistraion = new mongoose.model("TagsRegistraion",youtube_Tags_Schema)
module.exports = TagsRegistraion