import React, { useState, useEffect } from "react";
import { isAlreadyRegisteredStudentsData, UpdateStudentAttendence } from "../../Service/api";
// import "./Student.css"
import { useNavigate } from "react-router-dom";
import moment from "moment";


const UpdateStudentAttendenceData = () => {
    const history = useNavigate();
    useEffect(() => {
        const TeacherInfo = JSON.parse(localStorage.getItem("Teacher"));
        //console.log(userInfo._id);
        if (!TeacherInfo) {
            history("/");
            return
        } else {

            localStorage.setItem("TeacherID", TeacherInfo.Teacher._id);
            localStorage.setItem("InstituteID", TeacherInfo.Teacher.institutionId);
            getAllStudents();
        }
    }, [history]);

    const AttendenceData = JSON.parse(localStorage.getItem("AttendenceData"));

    const Teacher_Attendence_requirement = {
        institutionId: AttendenceData.institutionId,
        tid: AttendenceData.tid,
        Class: AttendenceData.Class,
        Section: AttendenceData.Section,
        date: AttendenceData.date,
        subjectCode: AttendenceData.subjectCode,
    };

    const [user, setUser] = useState(Teacher_Attendence_requirement);

    const {
        Class,
        Section,
        date,
        subjectCode,
        institutionId,
        tid,
    } = user;

    function getStyle(student_present) {
        return {
            backgroundColor: student_present ? '#49B66E' : '#fff',
            color: student_present ? '#fff' : '#3b3b3b'
        }
    }

    const [Students, setStudents] = useState([]);

    const getAllStudents = async () => {
        try {
            let response = await isAlreadyRegisteredStudentsData(user);
            const tmp = response.data.map((u) => {
                return { StudentId: u.StudentId, name: u.name, FatherName: u.FatherName, date: u.date, present: u.present }
            });
            setStudents(tmp)
            // console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const studentPresent = (id) => {
        // console.log("hello")
        const objIndex = Students.findIndex((obj => obj.StudentId == id));
        // console.log(objIndex);
        //console.log("Before update: ", Students[objIndex])
        if (Students[objIndex].present == true) {
            Students[objIndex].present = false
        } else {
            Students[objIndex].present = true
        }
        // console.log("after update: ", Students[objIndex])
    }

    const attendencesubmitHandler = async (e) => {
        e.preventDefault();
        const mainData = {
            tid: tid,
            institutionId: institutionId,
            Class: Class,
            Section: Section,
            date: date,
            subjectCode: subjectCode,
            attendee: Students,
        }
        try {
            const result = await UpdateStudentAttendence(mainData);
            if (result) {
                alert("Attendence Updated SuccessFully")
                localStorage.removeItem("AttendenceData");
                history("/Teacher")
            }
        } catch (error) {
            console.log(error)
        }
        //console.log(mainData)
    }
    var i = 1
    var j = 1

    Students.sort((a, b) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    // const ghhj = date.toISOString().split('T')[0]
    // console.log(ghhj);
    // datePickerId.max = new Date().toISOString().split("T")[0]
    return (
        <>
            {/* desktop view */}
            <div className="container mt-4 d-none d-md-block">
                <div className="container main_container py-3 ">
                    <h4 className="text-center border-bottom border-dark pb-2">
                        Update Students Attendence
                    </h4>
                    <div className="container d-flex justify-content-between my-2">
                        <div className=""><p>Class <b>: {Class}</b></p></div>
                        <div className="pl-3"><p>Section <b>: {Section}</b></p></div>
                        <div className="pl-3"><p>Subject <b>: {subjectCode}</b> </p></div>
                        <div className="pl-3"><p>Date <b>: {moment(date).format("DD/MM/YYYY")}</b></p></div>
                    </div>
                    <table className="table_layout">
                        <tr>
                            <th className="table_header">Id</th>
                            <th className="table_header">Name</th>
                            <th className="table_header">IS Ateend</th>
                        </tr>
                        {
                            Students.map((student) =>
                            (
                                <tr key={j++} >
                                    <td className="table_body">{i++}</td>
                                    <td className="nameCol table_body">{student.name}
                                        <p className="text-secondary ">Student</p>
                                    </td>
                                    <td className="switchCol table_body">
                                        {/* {student.present ? 'Present' : 'Absent'} */}
                                        <label class="switch">
                                            <input type="checkbox" style={getStyle(student.present)} onChange={() => studentPresent(student.StudentId)} defaultChecked={student.present} />
                                            <span class="slider round"></span>
                                        </label>
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                    <div className="d-flex justify-content-center mx-auto mt-4 pt-3 mb-4">
                        <button onClick={attendencesubmitHandler} className="btn table_btn btn-sm pl-5 pr-5 btn-dark">
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            {/* // <phone view ui> */}
            <div className="container mt-4 d-block d-md-none">
                <div className="container main_container py-3 ">
                    <h4 className="text-center border-bottom border-dark pb-2">
                        Update Students Attendence
                    </h4>
                    
                    <div className="container d-flex justify-content-between my-2">
                        <div className=""><p>Class <b>: {Class}</b></p></div>
                        <div className="pl-3"><p>Section <b>: {Section}</b></p></div>
                        <div className="pl-3"><p>Subject <b>: {subjectCode}</b> </p></div>
                        <div className="pl-3"><p>Date <b>: {moment(date).format("DD/MM/YYYY")}</b></p></div>
                    </div>
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>IS Ateend</th>
                        </tr>
                        {
                            Students.map((student) =>
                            (
                                <tr key={j++} >
                                    <td>{i++}</td>
                                    <td className="nameCol">{student.name}
                                        <p className="text-secondary ">Student</p>
                                    </td>
                                    <td className="switchCol">
                                        {/* {student.present ? 'Present' : 'Absent'} */}
                                        <label class="switch">
                                            <input type="checkbox" style={getStyle(student.present)} onChange={() => studentPresent(student.StudentId)} defaultChecked={student.present} />
                                            <span class="slider round"></span>
                                        </label>
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                    <div className="d-flex justify-content-center mx-auto mt-4 pt-3 mb-4">
                        <button onClick={attendencesubmitHandler} className="btn btn-sm pl-5 pr-5 btn-dark">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default UpdateStudentAttendenceData;
