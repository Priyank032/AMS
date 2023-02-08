const TeacherRegistration = require("../models/teacherregistration");
const StudentRegistration = require("../models/studentregistration");
const asyncHandler = require("express-async-handler");
const AttendenceRegistration = require("../models/atttendenceRegistration");
const MarksRegistration = require("../models/marksRegistration");

const getStudent = async (req, res) => {
  const { Class, institutionId, Section } = req.body;
  try {
    const StudentData = await StudentRegistration.find({
      Class,
      Section,
      institutionId,
    });
    res.status(201).send(StudentData);
    //    console.log(StudentData[0].name);
  } catch (error) {
    console.log(error);
  }
};

const isAlreadyRegistered = async (req, res) => {
  const { subjectCode, tid, Class, date, Section, institutionId } = req.body;
  const alreadyRegister = await AttendenceRegistration.findOne({
    Class,
    date,
    Section,
    institutionId,
    tid,
    subjectCode,
  });
  if (alreadyRegister) {
    res.status(201).send(alreadyRegister);
    console.log("pehle se chadi hui h");
    console.log(alreadyRegister);
  } else {
    res.status(201).send(false);
  }
};

const StudentAttendence = async (req, res) => {
  const { subjectCode, tid, Class, Section, date, institutionId, attendee } =
    req.body;
  try {
    const result = await AttendenceRegistration.create(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.send(error);
  }
};

const registeredStudentAttendenceData = async (req, res) => {
  const { subjectCode, tid, Class, Section, date, institutionId } = req.body;
  const StudentsAttendenceData = await AttendenceRegistration.findOne({
    Class,
    date,
    Section,
    institutionId,
    tid,
    subjectCode,
  });
  if (StudentsAttendenceData) {
    res.status(201).send(StudentsAttendenceData.attendee);
    // console.log(StudentsAttendenceData.attendee);
  }
};
const UpdateStudentAttendenceData = async (req, res) => {
  const { subjectCode, tid, Class, date, Section, institutionId, attendee } =
    req.body;
  // console.log(attendee);
  const resultUpdateStudentsAttendenceData =
    await AttendenceRegistration.findOneAndUpdate(
      { subjectCode, Section, tid, Class, date, institutionId },
      { attendee },
      {
        new: true,
      }
    );
  if (resultUpdateStudentsAttendenceData) {
    res.status(201).send(resultUpdateStudentsAttendenceData);
  } else {
    res.status(400);
    throw new Error("data not updated in attendence table");
  }
};

const isAlreadyMarksRegistered = async (req, res) => {
  const { subjectCode, tid, Class, date, Section, totalMarks, institutionId } =
    req.body;
  const alreadyRegister = await MarksRegistration.findOne({
    Class,
    totalMarks,
    date,
    Section,
    institutionId,
    tid,
    subjectCode,
  });
  if (alreadyRegister) {
    res.status(201).send(alreadyRegister);
    console.log("pehle se chade hue marks");
    // console.log(alreadyRegister);
  } else {
    res.status(201).send(false);
  }
};

const StudentMarks = async (req, res) => {
  const {
    subjectCode,
    tid,
    Class,
    Section,
    date,
    institutionId,
    totalMarks,
    studentMarks,
  } = req.body;
  try {
    const result = await MarksRegistration.create(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.send(error);
  }
};

const registeredStudentMarksData = async (req, res) => {
  const { subjectCode, tid, Class, Section, date, institutionId, totalMarks } =
    req.body;
  const StudentsMarksData = await MarksRegistration.findOne({
    Class,
    date,
    Section,
    institutionId,
    tid,
    subjectCode,
    totalMarks,
  });
  if (StudentsMarksData) {
    res.status(201).send(StudentsMarksData.studentMarks);
    // console.log(StudentsAttendenceData.attendee);
  }
};

const UpdateStudentMarksData = async (req, res) => {
  const {
    subjectCode,
    tid,
    Class,
    date,
    Section,
    institutionId,
    totalMarks,
    studentMarks,
  } = req.body;
   console.log(req.body);
 const resultUpdateStudentsMarksData = await MarksRegistration.findOneAndUpdate( { subjectCode, Section, tid, Class, date, totalMarks, institutionId },{studentMarks},
      {
        new: true,
      }
    );
  if (resultUpdateStudentsMarksData) {
    res.status(201).send(resultUpdateStudentsMarksData);
  } else {
    res.status(400);
    throw new Error("data not updated in attendence table");
  }
  // try {
  //     const result = await AttendenceRegistration.create(req.body)

  // } catch (error) {
  //     res.send(error)
  // }
};

module.exports = {
  getStudent,
  StudentAttendence,
  isAlreadyRegistered,
  registeredStudentAttendenceData,
  UpdateStudentAttendenceData,
  isAlreadyMarksRegistered,
  StudentMarks,
  registeredStudentMarksData,
  UpdateStudentMarksData
};

// findOneAndUpdate(filter, update, {
//     new: true
// });
