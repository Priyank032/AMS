const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const AdminRegistrationSchema = new mongoose.Schema({ 
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
    password:{
        type:String,
        required:true
    },
    
})

AdminRegistrationSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        next();
    }
})
// AdminRegistrationSchema.methods.generateToken = async function(){
//     const token = jwt.sign({_id:this._id},"thisismysecreatkey")
//     this.tokens = this.tokens.concat({token:token})
//     await this.save()
//     return token;

// }
AdminRegistrationSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}
const AdminRegistration = new mongoose.model("Adminregistration",AdminRegistrationSchema)
module.exports = AdminRegistration