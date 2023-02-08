const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const studentRegistrationScehma = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Father_name:{
        type:String,
        required:true
    },
    Mother_name:{
        type:String,
        required:true
    },
    DOB:{
        type:Date,
        required:true
    },
    Aadhar_no:{
        type:Number,
       
        default:null
    },
    SamagraId:{
        type:Number,
       
        default:null
    },
    Username:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    Alternate_Email:{
        type:String,
        default:null
    },
    Admission_no:{
        type:String,
        required:true,
    },
    Class:{
        type:Number,
        required:true
    },
    Section:{
        type:String,
        default:null
        
    },
    Phone:{
        type:Number,
        required:true,
        unique:true 
    },
    Alternate_Phone:{
        type:Number, 
        default:null      
    },
    
    Blood_Group:{
        type:String,
        default:null
    },
    Caste:{
        type:String,
        required:true
    },
    Due_Fees:{
        type:Number,
        required:true,
    },

    Total_Fees:{
        type:Number,
        required:true,
    },
    
    institutionId:{
        type:String,
         required:true
    },
    joinedAt:{
        type:Date,
         required:true,
         default: Date.now()
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
})

//studentRegistrationScehma.add({ joinedAt: [String] },'');
studentRegistrationScehma.methods.generateToken = async function(){
    const token = jwt.sign({_id:this._id},"thisismysecreatkey")
    this.tokens = this.tokens.concat({token:token})
    await this.save()
    return token;

}

studentRegistrationScehma.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        next();
    }
})
studentRegistrationScehma.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}
const StudentRegistration = new mongoose.model("Studentregistration",studentRegistrationScehma)
 

module.exports = StudentRegistration

// StudentRegistration.update({},{ $set:{"JoinedAt":new Date()}},{upsert:false , multi:true})