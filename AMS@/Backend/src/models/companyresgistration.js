const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const companyRegistrationScehma = new mongoose.Schema({
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
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
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
    attendence_type:{
        type:String,
        required:false,
    },
    
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
})
companyRegistrationScehma.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        next();
    }
})
// companyRegistrationScehma.methods.generateToken = async function(){
//     const token = jwt.sign({_id:this._id},"thisismysecreatkey")
//     this.tokens = this.tokens.concat({token:token})
//     await this.save()
//     return token;

// }
companyRegistrationScehma.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}
const CompanyRegistration = new mongoose.model("Companyregistration",companyRegistrationScehma)
module.exports = CompanyRegistration