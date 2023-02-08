import React, { useState, useEffect } from "react";
import { registeredStudentMarksData, UpdateStudentMarkssData } from "../../Service/api";
// import "./Student.css"
import { useNavigate } from "react-router-dom";


const UpdateStudentMarksData = () => {
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

    const MarksData = JSON.parse(localStorage.getItem("MarksData"));

    const Teacher_Marks_requirement = {
        institutionId: MarksData.institutionId,
        tid: MarksData.tid,
        Class: MarksData.Class,
        Section: MarksData.Section,
        date: MarksData.date,
        subjectCode: MarksData.subjectCode,
        totalMarks: MarksData.totalMarks
    };

    const [user, setUser] = useState(Teacher_Marks_requirement);
    const [StudentMarkSingle, setStudentMarkSingle] = useState();
    const {
        Class,
        Section,
        date,
        subjectCode,
        institutionId,
        tid,
        totalMarks,
    } = user;


    const [Students, setStudents] = useState([]);

    const getAllStudents = async () => {
        try {
            let response = await registeredStudentMarksData(user);
            const tmp = response.data.map((u) => {
                return { StudentId: u.StudentId, name: u.name, FatherName: u.FatherName, subjectCode: subjectCode, date: date, totalMarks: totalMarks, obtainedMarks: u.obtainedMarks }
            });
            setStudents(tmp)
            // console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const studentMarksChange = (e, id) => {
        //e.preventDefault()
        console.log(e.target.value);
        const objIndex = Students.findIndex((obj => obj.StudentId == id));
        // setStudentMarkSingle(e.target.value);
        // console.log(objIndex);
        // console.log("Before update: ", Students[objIndex])

        Students[objIndex].obtainedMarks = e.target.value

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
            totalMarks: totalMarks,
            studentMarks: Students,
        }
        try {
            const result = await UpdateStudentMarkssData(mainData);
            if (result) {
                alert("Marks Updated SuccessFully")
                localStorage.removeItem("MarksData");
                history("/Teacher")
                console.log(result)
            }
        } catch (error) {
            console.log(error)
        }
    }
    var i = 1
    var j = 1
    var k = 1
    var lko = 0;

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
    // datePickerId.max = new Date().toISOString().split("T")[0]
    return (
        <>
            {/* desktop view */}
            <div className="container mt-4 d-none d-md-block">
                <div className="container main_container py-3 ">
                    <h4 className="text-center border-bottom border-dark pb-2">
                        Update Students Marks
                    </h4>
                    <div className="container d-flex justify-content-between my-2">
                        <div className=""><p>Class <b>: {Class}</b></p></div>
                        <div className="pl-3"><p>Section <b>: {Section}</b></p></div>
                        <div className="pl-3"><p>Subject <b>: {subjectCode}</b> </p></div>
                        <div className="pl-3"><p>Total Marks <b>: {totalMarks}</b></p></div>
                    </div>
                    <form onSubmit={attendencesubmitHandler}>
                        <table className="table_layout">
                            <tr>
                                <th className="table_header">Id</th>
                                <th className="table_header">Name</th>
                                <th className="table_header">Marks</th>
                            </tr>

                            {
                                Students.map((student) =>
                                (
                                    <tr key={j++} >
                                        <td className="table_body">{i++}</td>
                                        <td className="nameCol table_body">{student.name}
                                            <p className="text-secondary ">{student.FatherName}</p>
                                        </td>

                                        <td className=" table_body">
                                            <input type="number" required max={totalMarks} onChange={(e) => studentMarksChange(e, student.StudentId)} defaultValue={student.obtainedMarks} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                        <div className="d-flex justify-content-center mx-auto mt-4 pt-3 mb-4">
                            <button type='submit' className="btn table_btn btn-sm pl-5 pr-5 btn-dark">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* // <phone view ui> */}
            <div className="container mt-4 d-block d-md-none">
                <div className="container main_container py-3 ">
                    <h4 className="text-center border-bottom border-dark pb-2">
                        Update Students Marks
                    </h4>
                    <div className="container d-flex justify-content-between my-2">
                        <div className=""><p>Class <b>: {Class}</b></p></div>
                        <div className="pl-3"><p>Section <b>: {Section}</b></p></div>
                        <div className="pl-3"><p>Subject <b>: {subjectCode}</b> </p></div>
                        <div className="pl-3"><p>Total Marks <b>: {totalMarks}</b></p></div>
                    </div>
                    <form onSubmit={attendencesubmitHandler}>

                        <table>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Marks</th>
                            </tr>
                            {
                                Students.map((student) =>
                                (
                                    <tr key={j++} >
                                        <td>{k++}</td>
                                        <td className="nameCol">{student.name}
                                            <p className="text-secondary ">{student.FatherName}</p>
                                        </td>

                                        <td className="">
                                            <input type="number" required max={totalMarks} onChange={(e) => studentMarksChange(e, student.StudentId)} defaultValue={student.obtainedMarks} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                        <div className="d-flex justify-content-center mx-auto mt-4 pt-3 mb-4">
                            <button type="submit" className="btn btn-sm pl-5 pr-5 btn-dark">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default UpdateStudentMarksData;
