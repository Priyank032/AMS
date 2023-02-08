const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const teacherRegistrationScehma = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
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
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new error("please right the appropriate email")
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        unique:true 
    },
    institutionId:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
})

teacherRegistrationScehma.methods.generateToken = async function(){
    const token = jwt.sign({_id:this._id},"thisismysecreatkey")
    this.tokens = this.tokens.concat({token:token})
    await this.save()
    return token;

}
teacherRegistrationScehma.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        next();
    }
})

teacherRegistrationScehma.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

const TeacherRegistration = new mongoose.model("Teacherregistration",teacherRegistrationScehma)
module.exports = TeacherRegistration