const CompanyRegistration = require("../models/companyresgistration");
const TeacherRegistration = require("../models/teacherregistration");
const StudentRegistration = require("../models/studentregistration");
const asyncHandler = require("express-async-handler");
const resetToken = require("../models/resetToken");

const isUser = async (id) => {
    const ResetToken = await resetToken.findOne({owner:id})
    if (!ResetToken) {
        return false;

    } else {
        return ResetToken;
    }
}

const isResetTokenValid = asyncHandler(async (req, res, next) => {
    const { token, id } = req.query;
    if (!token || !id) {
        res.status(400)
        throw new Error("Invalid Request");
    }

    const Teacher = await TeacherRegistration.findById(id)
    const Student = await StudentRegistration.findById(id)
    const Dba = await CompanyRegistration.findById(id)
    if (!Teacher && !Student && !Dba) {
        res.status(400)
        throw new Error("User not found");
    }


    if (Teacher) {
        const result1 = await isUser(Teacher)
        if (!result1) {
            const isValid = await result1.compareToken(token)
            if (!isValid) {
                res.status(400)
                throw new Error("Reset Token is not valid");
            }

            req.user = Teacher
            next();
           
        } else {
            res.status(400)
            throw new Error("Verification Falied Please try again");
        }
    } else if (Student) {
        const result2 = await isUser(Student)
        if (result2) {
            const isValid = await result2.compareToken(token)
            if (!isValid) {
                res.status(400)
                throw new Error("Reset Token is not valid");
            }

            req.user = Student
            next();
            
        } else {
            res.status(400)
            throw new Error("Verification Falied Please try again");
        }
    } else if (Dba) {
       // console.log(Dba._id);
        const result3 = await isUser(id)
        if (result3) {
            const isValid = await result3.compareToken(token)
            if (!isValid) {
                res.status(400)
                throw new Error("Reset Token is not valid");
            }

            req.user = Dba
            next();
           
        } else {
            res.status(400)
            throw new Error("Verification Falied Please try again ");
        }
    } else {
        console.log("WTF!!!!");
    }

})

module.exports = { isResetTokenValid };