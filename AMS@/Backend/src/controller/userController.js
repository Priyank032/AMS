const CompanyRegistration = require("../models/companyresgistration");
const TeacherRegistration = require("../models/teacherregistration");
const StudentRegistration = require("../models/studentregistration");
const AdminRegistration = require("../models/AdminModel");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/generateToken");
const ResetToken = require("../models/resetToken");
const { tokenWorking, isPasswordSame } = require("../utils/helper");
const { mail } = require("../utils/mail");

// Login
const login = asyncHandler(async (req, res) => {
  // try {
  const { email, password } = req.body;

  const Teacher = await TeacherRegistration.findOne({ email });
  const Student = await StudentRegistration.findOne({ email });
  const Dba = await CompanyRegistration.findOne({ email });
  const Admin = await AdminRegistration.findOne({ email });
  if (!Teacher && !Student && !Dba && !Admin) {
    res.status(400);
    throw new Error("User not Found, Invalid Credentials");
  }
  if (Dba) {
    if (await Dba.matchPassword(password)) {
      res.json({
        Dba,
        name: "Dba",
        token: generateToken(Dba._id),
      });
      res.status(200).send(Dba);
    } else {
      res.status(400);
      throw new Error("Invalid Password");
    }
  } else if (Teacher) {
    if (await Teacher.matchPassword(password)) {
      res.json({
        Teacher,
        name: "Teacher",
        token: generateToken(Teacher._id),
      });
      res.status(200).send(Teacher);
    } else {
      res.status(400);
      throw new Error("Invalid Password");
    }
  } else if (Student) {
    if (await Student.matchPassword(password)) {
      res.json({
        Student,
        name: "Student",
        token: generateToken(Student._id),
      });
      res.status(200).send(Student);
    } else {
      res.status(400);
      throw new Error("Invalid Password");
    }
  } else if (Admin) {
    if (await Admin.matchPassword(password)) {
      res.json({
        Admin,
        name: "Admin",
        token: generateToken(Admin._id),
      });
      res.status(200).send(Admin);
    } else {
      res.status(400);
      throw new Error("Invalid Password");
    }
  }
});



//forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("please provide a valid email");
  }

  const Teacher = await TeacherRegistration.findOne({ email });
  const Student = await StudentRegistration.findOne({ email });
  const Dba = await CompanyRegistration.findOne({ email });
  if (!Teacher && !Student && !Dba) {
    res.status(400);
    throw new Error("User not Found, Invalid Credentials");
  }

  if (Teacher) {
    const result1 = await tokenWorking(Teacher);
    if (result1) {
      res.json({
        success: true,
        message: "password reset link is sent to your gmail",
      });
    } else {
      res.status(400);
      throw new Error(
        "only after five minutes you can request fro another token"
      );
    }
    console.log(result1);
  } else if (Student) {
    const result2 = await tokenWorking(Student);
    if (result2) {
      res.json({
        success: true,
        message: "password reset link is sent to your gmail",
      });
    } else {
      res.status(400);
      throw new Error(
        "only after five minutes you can request fro another token"
      );
    }
  } else if (Dba) {
    const result3 = await tokenWorking(Dba);
    if (result3) {
      res.json({
        success: true,
        message: "password reset link is sent to your gmail",
      });
    } else {
      res.status(400);
      throw new Error(
        "only after five minutes you can request fro another token"
      );
    }
  } else {
    console.log("pta nhi kya error h bimro");
  }
});

//reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  const Teacher = await TeacherRegistration.findById(req.user._id);
  const Student = await StudentRegistration.findById(req.user._id);
  const Dba = await CompanyRegistration.findById(req.user._id);
  if (!Teacher && !Student && !Dba) {
    res.status(400);
    throw new Error("User not found");
  }

  if (Teacher) {
    const result1 = await isPasswordSame(Teacher, password);
    if (!result1) {
      res.status(400);
      throw new Error("New password must be different");
    } else {
      if (password.trim().length < 8 || password.trim().length > 20) {
        res.status(400);
        throw new Error("password must be 8 to 20 cahracters long");
      }

      Teacher.password = password.trim();
      const result = await Teacher.save();
      if (result) {
        await ResetToken.findOneAndDelete({ owner: Teacher._id });
        mail(Teacher);

        res.json({
          success: true,
          message: "Password reset Successfully",
        });
      } else {
        res.status(400);
        throw new Error("password not updated Please try again after sometime");
      }
    }
  } else if (Student) {
    const result1 = await isPasswordSame(Student, password);
    if (!result1) {
      res.status(400);
      throw new Error("New password must be different");
    } else {
      if (password.trim().length < 8 || password.trim().length > 20) {
        res.status(400);
        throw new Error("password must be 8 to 20 cahracters long");
      }

      Student.password = password.trim();
      const result = await Student.save();
      if (result) {
        await ResetToken.findOneAndDelete({ owner: Student._id });
        mail(Student);

        res.json({
          success: true,
          message: "Password reset Successfully",
        });
      } else {
        res.status(400);
        throw new Error("password not updated Please try again after sometime");
      }
    }
  } else if (Dba) {
    const result1 = await isPasswordSame(Dba, password);
    if (!result1) {
      res.status(400);
      throw new Error("New password must be different");
    } else {
      if (password.trim().length < 8 || password.trim().length > 20) {
        res.status(400);
        throw new Error("password must be 8 to 20 cahracters long");
      }

      Dba.password = password.trim();
      const result = await Dba.save();
      if (result) {
        await ResetToken.findOneAndDelete({ owner: Dba._id });
        mail(Dba);

        res.json({
          success: true,
          message: "Password reset Successfully",
        });
      } else {
        res.status(400);
        throw new Error("password not updated Please try again after sometime");
      }
    }
  } else {
    console.log("WTF!!!!");
  }
});


const resetUpdatePassword = asyncHandler(async (req, res) => {
  const { oldpassword, password, _id } = req.body;

  const Teacher = await TeacherRegistration.findById(_id);
  const Student = await StudentRegistration.findById(_id);
  const Dba = await CompanyRegistration.findById(_id);
  const Admin = await AdminRegistration.findById(_id);
  if (!Teacher && !Student && !Dba && !Admin) {
    res.status(400);
    throw new Error("User not found");
  }

  if (Teacher) {
    if (await Teacher.matchPassword(oldpassword)) {
      const result1 = await isPasswordSame(Teacher, password);
      if (!result1) {
        res.status(400);
        throw new Error("New password must be different");
      }
      else {
        if (password.trim().length < 8 || password.trim().length > 20) {
          res.status(400);
          throw new Error("password must be 8 to 20 cahracters long");
        }
        else {
         
          Teacher.password = password.trim();
          const result = await Teacher.save();
          if (result) {
            res.json({
              success: true,
              message: "Password reset Successfully",
            });
          }
          else {
            res.status(400);
            throw new Error("password not updated Please try again after sometime");
          }
        }
      }
    }
    else {
      res.status(400);
      throw new Error("your current password is wrong");
    }
  }
  else if (Student) {
    if (await Student.matchPassword(oldpassword)) {
      const result1 = await isPasswordSame(Student, password);
      if (!result1) {
        res.status(400);
        throw new Error("New password must be different");
      }
      else {
        if (password.trim().length < 8 || password.trim().length > 20) {
          res.status(400);
          throw new Error("password must be 8 to 20 cahracters long");
        }
        else {
          Student.password = password.trim();
          const result = await Student.save();
          if (result) {
            res.json({
              success: true,
              message: "Password reset Successfully",
            });
          }
          else {
            res.status(400);
            throw new Error("password not updated Please try again after sometime");
          }
        }
      }
    }
    else {
      res.status(400);
      throw new Error("your current password is wrong");
    }
  }
  else if (Dba) {
    if (await Dba.matchPassword(oldpassword)) {
      const result1 = await isPasswordSame(Dba, password);
      if (!result1) {
        res.status(400);
        throw new Error("New password must be different");
      }
      else {
        if (password.trim().length < 8 || password.trim().length > 20) {
          res.status(400);
          throw new Error("password must be 8 to 20 cahracters long");
        }
        else {
          Dba.password = password.trim();
           const result = await Dba.save();
          //  console.log(result);
          if (!result) {
            res.status(400);
            throw new Error("password not updated Please try again after sometime");
            // res.send(resulttu)
          } else {
            res.json({
              success: true,
              message: "Password reset Successfully",
            });
          }
        }
      }
    } else {
      res.status(400);
      throw new Error("your current password is wrong");
    }
  }
  else if (Admin) {
    if (await Admin.matchPassword(oldpassword)) {
      const result1 = await isPasswordSame(Admin, password);
      if (!result1) {
        res.status(400);
        throw new Error("New password must be different");
      }
      else {
        if (password.trim().length < 8 || password.trim().length > 20) {
          res.status(400);
          throw new Error("password must be 8 to 20 cahracters long");
        }
        else {
          Admin.password = password.trim();
          const result = await Admin.save();
          if (result) {
            res.json({
              success: true,
              message: "Password reset Successfully",
            });
          } else {
            res.status(400);
            throw new Error("password not updated Please try again after sometime");
          }
        }
      }
    }
    else {
      res.status(400);
      throw new Error("your current password is wrong");
    }
  }
  else {
    console.log("WTF!!!!");
  }
});

module.exports = {
  login,
  forgotPassword,
  resetPassword,
  resetUpdatePassword,
};
