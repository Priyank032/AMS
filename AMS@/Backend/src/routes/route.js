const express = require("express");

const { registerUser,allUsers,getUserById,updateUser,deleteUser} = require("../controller/registerController");
const { getStudentAttendenceData,getStudentMarksData} = require("../controller/Student_Controller");
const {
    login,
    forgotPassword,
    resetPassword,
    resetUpdatePassword,
} = require("../controller/userController");
const Add_Tags = require("../controller/Admin_Controller");
const {
    teachherRegistration,
    allTeachers,
    getTeachersById,
    updateTeacher,
    deleteTeacher,
    NewStudentRegistration,
    allStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    SaveFeesDetails,
    allFeeDeatils,
    getFeeDetailsById,
    updateStudentFeeDetails,
} = require("../controller/Dba_Controller");
const { isResetTokenValid } = require("../middleware/authToken");
const {
    getStudent,
    StudentAttendence,
    isAlreadyRegistered,
    registeredStudentAttendenceData,
    UpdateStudentAttendenceData,
    isAlreadyMarksRegistered,
    StudentMarks,
    registeredStudentMarksData,
    UpdateStudentMarksData,
} = require("../controller/TeacherController");
const { isAuth } = require("../utils/generateToken");
const router = express.Router();

router.post("/admin/companyRegister", registerUser);
// router.post("/registercompanyAdmin", registerAdmin);
router.post("/admin/All_Users", allUsers);
router.post("/admin/edit_User/:id", getUserById);
router.post("/admin/update_User/:id", updateUser);
router.post("/admin/delete_User/:id", deleteUser);
router.post("/admin/AddTags", Add_Tags);


router.post("/login", login);
router.post("/forgot_password", forgotPassword);
router.post("/reset-password", isResetTokenValid, resetPassword);
router.post("/Update_Password", resetUpdatePassword);


router.post("/Dba/teacher_registration",teachherRegistration);
router.post("/Dba/All_Teachers", allTeachers);
router.post("/Dba/All_Teachers/edit_Teacher/:id", getTeachersById);
router.post("/Dba/All_Teachers/update_Teacher/:id", updateTeacher);
router.post("/Dba/All_Teachers/delete_Teacher/:id", deleteTeacher);

router.post("/Dba/student_registration", NewStudentRegistration);
router.post("/Dba/All_Students", allStudents);
router.post("/Dba/All_Students/edit_Student/:id", getStudentById);
router.post("/Dba/All_Students/update_Student/:id", updateStudent);
router.post("/Dba/All_Students/delete_Student/:id", deleteStudent);

router.post("/Dba/fees_section", SaveFeesDetails);
router.post("/Dba/fees_section/All_Details", allFeeDeatils);
router.post("/Dba/fees_section/edit_fees/:id", getFeeDetailsById);
router.post("/Dba/fees_section/update_fees/:id", updateStudentFeeDetails);
//router.post('/Dba/fees_section/delete_fees/:id', deleteStudent);

// router for the teacher starting here

router.post("/teacher/getStudent", getStudent);
router.post("/teacher/isAlreadyRegistered", isAlreadyRegistered);
router.post("/teacher/studentAttendence", StudentAttendence);
router.post(
    "/teacher/registeredStudentAttendence",
    registeredStudentAttendenceData
);
router.post(
    "/teacher/UpdateStudentAttendenceData",
    UpdateStudentAttendenceData
);
router.post("/teacher/isAlreadyMarksRegistered", isAlreadyMarksRegistered);
router.post("/teacher/StudentMarks", StudentMarks);
router.post(
    "/teacher/registeredStudentMarksData",
    registeredStudentMarksData
);
router.post(
    "/teacher/UpdateStudentMarksData",
    UpdateStudentMarksData
);



router.post(
    "/student/getStudentAttendenceData",
    getStudentAttendenceData
);
router.post(
    "/student/getStudentMarksData",
    getStudentMarksData
);

module.exports = router;
