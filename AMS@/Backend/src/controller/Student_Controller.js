const TeacherRegistration = require("../models/teacherregistration");
const StudentRegistration = require("../models/studentregistration");
const asyncHandler = require("express-async-handler");
const AttendenceRegistration = require("../models/atttendenceRegistration");
const MarksRegistration = require("../models/marksRegistration");

const getStudentAttendenceData = async (req, res) => {
    const { Class, institutionId, id,Section } = req.body;
    try {
        const StudentData = await AttendenceRegistration.find({ Class, institutionId,Section });
        const attendenceData = []
        StudentData.map((student) => {
            student.attendee.map((user) => {
                if (user.StudentId == id) {
                    attendenceData.push(user)
                }
            })
        })
        // console.log(attendenceData);
         res.status(201).send(attendenceData);
    } catch (error) {
        console.log(error);
    }
};
const getStudentMarksData = async (req, res) => {
    const { Class, institutionId, id,Section } = req.body;
    try {
        const StudentData = await MarksRegistration.find({ Class, institutionId,Section });
        const MarksData = []
        StudentData.map((student) => {
            student.studentMarks.map((user) => {
                if (user.StudentId == id) {
                    MarksData.push(user)
                }
            })
        })
        // console.log(attendenceData);
         res.status(201).send(MarksData);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getStudentAttendenceData,getStudentMarksData

};


