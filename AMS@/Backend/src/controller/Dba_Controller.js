const TeacherRegistration = require("../models/teacherregistration");
const StudentRegistration = require("../models/studentregistration");
const FeesManagement = require("../models/Fees_Details");
const asyncHandler = require("express-async-handler");
const { mail } = require("../utils/mail");


//Teacher registration start

const teachherRegistration = asyncHandler(async (req, res) => {
    const { email,username,phone } = req.body;
    const teacherExists = await TeacherRegistration.findOne({ email });
    const teacherUsernameExists = await TeacherRegistration.findOne({ username });
    const teacherPhoneExists = await TeacherRegistration.findOne({ phone });

    if (teacherExists || teacherUsernameExists ||teacherPhoneExists ) {
        res.status(400);
        throw new Error("Teacher already Exists maybe Email/Username/Phone is already regsiter");
    } else{
        const teacher = await TeacherRegistration.create(req.body);
        console.log(req.body);
        if (teacher) {
            res.status(201).json(teacher);
        } else {
            res.status(400);
            throw new Error("Please try again after sometime");
        }

    }
    // login ke baad student or attendence marks  ki id or data local me save karana h
});

//Teacher registration end

//Student registration Start

const NewStudentRegistration = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const StudentExists = await StudentRegistration.findOne({ email });

    if (StudentExists) {
        res.status(400);
        throw new Error("Student already Exists");
    }
    // login ke baad student or attendence marks  ki id or data local me save karana h
    const NewStudent = await StudentRegistration.create(req.body);
    if (NewStudent) {
        res.status(201).json(NewStudent);
    } else {
        res.status(400);
        throw new Error("Error Occured");
    }
});

//Student registration end

//All Teachers show start

const allTeachers = asyncHandler(async (req, res) => {
    const { institutionId } = req.body;
    //console.log(institutionId);

    const teachersData = await TeacherRegistration.find({
        institutionId: institutionId,
    });
    // const createUser = await user.save()
    // res.status(201).send(teachersData);
    if (!teachersData) {
        res.status(400);
        throw new Error();
    } else {
        res.status(201).send(teachersData);
    }
});

//All Teachers show end

//Get Teacher by id start

const getTeachersById = asyncHandler(async (req, res) => {
    const _id = req.params.id;

    const teacherData = await TeacherRegistration.findById(_id);
    // const createUser = await user.save()
    // res.status(201).send(teachersData);
    if (!teacherData) {
        res.status(400);
        throw new Error("Data not Found");
    } else {
        res.status(201).send(teacherData);
    }
});

//Get Teacher by id end

//Update Teacher start


const updateTeacher = async (req, res) => {

    const _id = req.params.id;
    //console.log(req.params.name);
    const updateTeacherData = await TeacherRegistration.findByIdAndUpdate(_id, req.body, {
        new: true
    });
    if (!updateTeacherData) {
        res.status(400);
        throw new Error("Data not updated ");
    } else {
        res.status(201).send(updateTeacherData);
    }

}

//Update Teacher end

//Delete Teacher start

const deleteTeacher = async (req, res) => {


    const _id = req.params.id;
    try {
        const deleteTeacherData = await TeacherRegistration.findByIdAndDelete(_id);
        res.status(201).send(deleteTeacherData);
    } catch (error) {
        res.status(400);
        throw new Error("Data not deleted ");
    }

}

//Delete Teacher end

//All Students show start

const allStudents = asyncHandler(async (req, res) => {
    const { institutionId } = req.body;
    //console.log(institutionId);

    const StudentsData = await StudentRegistration.find({
        institutionId: institutionId,
    });
    // const createUser = await user.save()
    // res.status(201).send(teachersData);
    if (!StudentsData) {
        res.status(400);
        throw new Error();
    } else {
        res.status(201).send(StudentsData);
    }
});

//All Students show end

//Get Student by id start

const getStudentById = asyncHandler(async (req, res) => {
    const _id = req.params.id;

    const studentData = await StudentRegistration.findById(_id);
    // const createUser = await user.save()
    // res.status(201).send(teachersData);
    if (!studentData) {
        res.status(400);
        throw new Error("Data not Found");
    } else {
        res.status(201).send(studentData);
    }
});

//Get Student by id end

//Update Student start

const updateStudent = async (req, res) => {

    const _id = req.params.id;
    //console.log(req.params.name);
    const updateStudentData = await StudentRegistration.findByIdAndUpdate(_id, req.body, {
        new: true
    });
    if (!updateStudentData) {
        res.status(400);
        throw new Error("Data not updated ");
    } else {
        res.status(201).send(updateStudentData);
    }

}

//Update Student end

//Delete Student start

const deleteStudent = async (req, res) => {


    const _id = req.params.id;
    try {
        const deleteStudentData = await StudentRegistration.findByIdAndDelete(_id);
        res.status(201).send(deleteStudentData);
    } catch (error) {
        res.status(400);
        throw new Error("Data not deleted ");
    }

}

//Delete Student end

//Save and student Fees Details start
const SaveFeesDetails = asyncHandler(async (req, res) => {
    const { name, Father_name, Class, Section, institutionId, Submitted_Fees } = req.body;
    const StudentExists = await StudentRegistration.findOne({name, Father_name, Class, institutionId });
   // console.log("ok tata ipl");

    if (StudentExists) {
        
        const feesDetails ={
            name:name,
            Father_name:Father_name,
            Class:Class,
            Section:Section,
            institutionId:institutionId,
            Submitted_Fees:Submitted_Fees
        }
        const isFessSubmitted = await FeesManagement.create(feesDetails);
       // console.log(isFessSubmitted);
        if (isFessSubmitted) {
            const newFees = StudentExists.Due_Fees - Submitted_Fees
            const filter = { name, Father_name, Class, institutionId };
            const update = { Due_Fees: newFees };
            const updateStudentFees = await StudentRegistration.findOneAndUpdate(filter, update, {
                new: true
            }); 
            if (updateStudentFees) {
                res.status(201).json("Fees updated");
            } else {
                res.status(400);
                throw new Error("Fees not updated");
            }
        } else {
            res.status(400);
            throw new Error("Fees not register");
        }
    } else {
        res.status(400);
        throw new Error("student not found");
    }
    // login ke baad student or attendence marks  ki id or data local me save karana h

});

//Save and student Fees Details end

//All fee deatails show start

const allFeeDeatils = asyncHandler(async (req, res) => {
    const { institutionId } = req.body;
    //console.log(institutionId);

    const studentFeesData = await FeesManagement.find({
        institutionId: institutionId,
    });
    // const createUser = await user.save()
    // res.status(201).send(teachersData);
    if (!studentFeesData) {
        res.status(400);
        throw new Error();
    } else {
        res.status(201).send(studentFeesData);
    }
});

//All fee deatails show end

//Get Student fee by id start

const getFeeDetailsById = asyncHandler(async (req, res) => {
    const _id = req.params.id;

    const studentFeeData = await FeesManagement.findById(_id);
    // const createUser = await user.save()
    // res.status(201).send(teachersData);
    if (!studentFeeData) {
        res.status(400);
        throw new Error("Data not Found");
    } else {
        res.status(201).send(studentFeeData);
    }
});

//Get Student fee by id end

//Update Student fee start

const updateStudentFeeDetails = async (req, res) => {
    //  console.log("hiiiiii");
    const _id = req.params.id;
    const {name, Father_name, Class, Section, institutionId, Submitted_Fees } = req.body;
    // add rollno remove name and father name
    const StudentExists = await StudentRegistration.findOne({ name, Father_name, Class, institutionId});
    const studentFeeData = await FeesManagement.findById(_id);
    const DbaEnterFees = studentFeeData.Submitted_Fees
    //console.log(req.params.name);
    const updateStudentFeeData = await FeesManagement.findOneAndUpdate({_id:_id}, req.body, {
        new: true
    });
    if(updateStudentFeeData){
        res.status(201).send(updateStudentFeeData)
    } else{
        console.log("koi error h");
    }
    if (updateStudentFeeData) {
        // console.log("run hua h");
        const newFees = StudentExists.Due_Fees + DbaEnterFees - Submitted_Fees
        const filter = { name, Father_name, Class, institutionId};
        const update = { Due_Fees: newFees };
        const AgainupdateStudentFees = await StudentRegistration.findOneAndUpdate(filter, update, {
            new: true
        });
        if (AgainupdateStudentFees) {
            res.status(201).send(AgainupdateStudentFees);
        } else {
            res.status(400);
            throw new Error("Fees not updated in student table");
        }
    } else {
        res.status(400);
        throw new Error("fees not updated in fees table");
    }

}

//Update Student fee end

module.exports = {
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
    updateStudentFeeDetails
};
