const CompanyRegistration = require("../models/companyresgistration");
const TeacherRegistration = require("../models/teacherregistration");
const StudentRegistration = require("../models/studentregistration");
const AttendenceRegistration = require("../models/atttendenceRegistration");
const MarksRegistration = require("../models/marksRegistration");
const asyncHandler = require("express-async-handler");
const {generateToken} = require("../utils/generateToken");
const ResetToken = require("../models/resetToken");
const { tokenWorking, isPasswordSame } = require("../utils/helper");
const { mail } = require("../utils/mail");

//Database administrator Login
const dbalogin = asyncHandler(async (req, res) => {
  // try {
  const { username, password } = req.body;

  const dbaUser = await CompanyRegistration.findOne({ username });
  if (dbaUser && (await dbaUser.matchPassword(password))) {
    //const dbaid = dbaUser._id;
    // // login ke baad dba ki id local me save karani h
    res.json({
      dbaUser,
      token: generateToken(dbaUser._id),
    });
    res.status(200).send(dbaUser);
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
  // } catch (error) {
  //   res.send(error);
  // }
});


//Teacher Login
const teacherLogin = asyncHandler(async (req, res) => {
  // try {
  const { username, password } = req.body;

  const teacher = await TeacherRegistration.findOne({ username });
  if (teacher && (await teacher.matchPassword(password))) {
    // const tid = teacher._id;

    res.json({
      teacher,
      token: generateToken(teacher._id),
    });
    res.status(200).send(teacher);
    // login ke baad teacher ki id local me save karani h
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
  // } catch (error) {
  //   res.send(error)
  // }
});


//Student Login
const studentlogin = asyncHandler(async (req, res) => {
  // try {
  const { username, password } = req.body;
  const student = await StudentRegistration.findOne({ username });
  const attendence = await AttendenceRegistration.find({
    institutionId: student.institutionId,
    rollno: student.rollno,
  });
  const marks = await MarksRegistration.find({
    institutionId: student.institutionId,
    rollno: student.rollno,
  });
  if (student && (await student.matchPassword(password))) {
    // const tid = student._id;

    res.json({
      student,
      token: generateToken(student._id),
    });
    res.status(200).send(student);
    // login ke baad teacher ki id local me save karani h
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
  // console.log(attendence);
  // console.log(marks);
  // const sid = student._id;
  // login ke baad student or attendence marks  ki id or data local me save karana h
  //res.render("student/spanel", { sid: sid,data:student,attendenceData:attendence ,marksData:marks})
  // }
  // catch (error) {
  //   res.send(error)
  // }
});


//Teacher registration
const teachherRegistration = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const teacherExists = await TeacherRegistration.findOne({ email });

  if (teacherExists) {
    res.status(400);
    throw new Error("Teacher already Exists");
  }
  // login ke baad student or attendence marks  ki id or data local me save karana h
  const teacher = await TeacherRegistration.create(req.body);
  if (teacher) {
    res.status(201).json(teacher);
  } else {
    res.status(400);
    throw new Error("Error Occured");
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
    const result1 = await tokenWorking(Teacher)
    if (result1) {
      res.json({
        success: true,
        message: "password reset link is sent to your gmail",
      });
    } else {
      res.status(400);
      throw new Error("only after five minutes you can request fro another token");
    }
    console.log(result1)
  } else if (Student) {
    const result2 = await tokenWorking(Student)
    if (result2) {
      res.json({
        success: true,
        message: "password reset link is sent to your gmail",
      });
    } else {
      res.status(400);
      throw new Error("only after five minutes you can request fro another token");
    }
  } else if (Dba) {
    const result3 = await tokenWorking(Dba)
    if (result3) {
      res.json({
        success: true,
        message: "password reset link is sent to your gmail",
      });
    } else {
      res.status(400);
      throw new Error("only after five minutes you can request fro another token");
    }
  }
  else {
    console.log("pta nhi kya error h bimro")
  }
});


//reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  const Teacher = await TeacherRegistration.findById(req.user._id)
  const Student = await StudentRegistration.findById(req.user._id)
  const Dba = await CompanyRegistration.findById(req.user._id)
  if (!Teacher && !Student && !Dba) {
    res.status(400)
    throw new Error("User not found");
  }

  if (Teacher) {
    const result1 = await isPasswordSame(Teacher, password)
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
    const result1 = await isPasswordSame(Student, password)
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
    const result1 = await isPasswordSame(Dba, password)
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

module.exports = {
  dbalogin,
  teacherLogin,
  studentlogin,
  teachherRegistration,
  forgotPassword,
  resetPassword,
};
