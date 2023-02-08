const mongoose = require("mongoose");
const validator = require("validator")

const marksRegistrationScehma = new mongoose.Schema({
   
    tid:{
        type:String,
        required:true
    },
    institutionId:{
        type:String,
        required:true
    },
    Class:{
        type:String,
        required:true
    },
    Section:{
        type:String,
        default: null
    },
    subjectCode:{
        type:String,
        required:true
    },
    
    date:{
        type:Date,
        required:true
    },

    totalMarks:{
        type:Number,
        required:true,
    },
    
    studentMarks:[{
        StudentId:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        FatherName:{
            type:String,
            required:true,
        },
        obtainedMarks:{
            type:Number,
            required:true,
        },
        subjectCode:{
            type:String,
            required:true
        },
        
        date:{
            type:Date,
            required:true
        },
    
        totalMarks:{
            type:Number,
            required:true,
        },

    }]
    
})


const MarksRegistration = new mongoose.model("Marksregistration",marksRegistrationScehma)
module.exports = MarksRegistration