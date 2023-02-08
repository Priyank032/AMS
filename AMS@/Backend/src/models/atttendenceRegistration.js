const mongoose = require("mongoose");

const attendenceRegistrationScehma = new mongoose.Schema({
   
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
        default: null
    },
    
    date:{
        type:Date,
        required:true
    },
    
    attendee:[{
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
        present:{
            type:Boolean,
            required:true,
        },
        date:{
            type:Date,
            required:true
        },

    }]
    
})


const AttendenceRegistration = new mongoose.model("Attendenceregistration",attendenceRegistrationScehma)
module.exports = AttendenceRegistration