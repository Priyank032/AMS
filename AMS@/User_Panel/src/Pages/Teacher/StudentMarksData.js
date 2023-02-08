import React, { useState, useEffect } from "react";
import { getStudentsForAttendence, StudentMarks, isAlreadyMarksRegistered } from "../../Service/api";
import "./Student.css"
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import Tchr from "../../Images/Tchr.svg";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const StudentMarksData = () => {
    const history = useNavigate();
    const Datee = new Date().toISOString().slice(0, 10);
    useEffect(() => {
        const TeacherInfo = JSON.parse(localStorage.getItem("Teacher"));
        //console.log(userInfo._id);
        if (!TeacherInfo) {
            history("/");
            return
        } else {

            localStorage.setItem("TeacherID", TeacherInfo.Teacher._id);
            localStorage.setItem("InstituteID", TeacherInfo.Teacher.institutionId);
            // getAllStudents();
        }
    }, [history]);

    const Teacherkiid = localStorage.getItem("TeacherID");
    const Institutekiid = localStorage.getItem("InstituteID");

    const Teacher_Marks_requirement = {
        institutionId: Institutekiid,
        tid: Teacherkiid,
        Class: "",
        Section: "",
        date: "",
        subjectCode: "",
        totalMarks: "",
    };

    const [showDiv, setShowDiv] = useState(false)
    const [user, setUser] = useState(Teacher_Marks_requirement);
    const [StudentMarkSingle, setStudentMarkSingle] = useState();

    const [inputType, setinputType] = useState("text");
    const typeChange = () => {
        setinputType("date")
    }
    const {
        Class,
        Section,
        date,
        subjectCode,
        totalMarks
    } = user;

    const handleChange = (e) => {
        // console.log(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value });
    };


    const [Students, setStudents] = useState([]);

    const getAllStudents = async () => {
        try {
            let response = await getStudentsForAttendence(user);
            const tmp = response.data.map((u) => {
                return { StudentId: u._id, name: u.name, FatherName: u.Father_name, subjectCode: subjectCode, date: date, totalMarks: totalMarks, obtainedMarks: StudentMarkSingle }
            });
            setStudents(tmp)
            // console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const submitHandler = async (e) => {
        e.preventDefault();

        const { data } = await isAlreadyMarksRegistered(user);
        if (data == false) {
            //console.log(result);

            setShowDiv(true)
            getAllStudents();
        }
        else {
            // alert("Attendence Already Registerd of this date")
            localStorage.setItem("MarksData", JSON.stringify(data));
            console.log("MarksData Already Registerd of this date");
            //console.log(result);
            history("/Teacher/update_Marks")
        }

    }
    const studentMarksChange = (e, id) => {

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
            tid: Teacherkiid,
            institutionId: Institutekiid,
            Class: Class,
            Section: Section,
            date: date,
            subjectCode: subjectCode,
            totalMarks: totalMarks,
            studentMarks: Students,
        }
        try {
            const result = await StudentMarks(mainData);
            if (result) {
                alert("Marks register SuccessFully")
                history("/Teacher")
            }
        } catch (error) {
            console.log(error)
        }
        // console.log(mainData);
    }
    var i = 1
    var j = 1
    var k = 1

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
    const picker = document.getElementById('date1');
    if (picker) {
        picker.addEventListener('input', function (e) {
            var day = new Date(this.value).getUTCDay();
            if ([5, 0].includes(day)) {
                e.preventDefault();
                this.value = '';
                alert('Sundays not allowed You can only register student attendence from Monday to Saturday');
            }
        });
    }
    if (showDiv) {
        return <>
            {/* desktop view */}
            <div className="container mt-4 d-none d-md-block">
                <div className="container main_container py-3 ">
                    <h4 className="text-center border-bottom border-dark pb-2">
                        Register Students Marks
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
                                            <input type="number" required max={totalMarks} onChange={(e) => studentMarksChange(e, student.StudentId)} value={StudentMarkSingle} />
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
                        Register Students Marks
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
                                            <input type="number" required max={totalMarks} onChange={(e) => studentMarksChange(e, student.StudentId)} value={StudentMarkSingle} />
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
    } else {
        return <div className="container-fluid mt-5">
            <div className="row mt-1">
                <div className="col-md-6">
                    <div className="main_text_all_panel mt-5">
                        <MdDashboard style={{ fontSize: "30px", marginTop: "-15px" }} />
                        <h5 className="font-weight-normal d-inline ml-3">
                            Marks Registration Form
                        </h5>
                        <div className=" mt-5">
                            <h3 className="text-dark">WANT TO Register a Marks ?</h3>
                            <p className="">Register Now ||</p>
                            <img className="img-fluid mt-4" src={Tchr} alt="Tchr" />
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mt-5">
                    <div className="container border  main_border_color ">
                        <div className="border Inner_border my-3 bg-white">
                            <div className="d-flex justify-content-center mt-3">
                                <FaUserCircle
                                    style={{ fontSize: "50px" }}
                                    className="icon_color"
                                />
                            </div>
                            <h4 className="text-center">Marks Registration Form</h4>
                            <form onSubmit={submitHandler}>
                                <div className="d-flex justify-content-around  flex-wrap">
                                    <Box>
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Class
                                            </InputLabel>
                                            <Input
                                                required
                                                type="number"
                                                name="Class"
                                                value={Class}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Total Marks
                                            </InputLabel>
                                            <Input
                                                required
                                                type="number"
                                                name="totalMarks"
                                                value={totalMarks}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </FormControl>
                                    </Box>

                                    <Box>
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Section (Optional)
                                            </InputLabel>
                                            <Input
                                                type="text"
                                                name="Section"
                                                value={Section}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Date
                                            </InputLabel>
                                            <Input
                                                required
                                                inputProps={{
                                                    max: new Date().toISOString().slice(0, 10),
                                                    min: "2022-01-01"
                                                }}
                                                type={inputType}
                                                id="date1"
                                                onClick={typeChange}
                                                name="date"
                                                value={date}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Subject Code
                                            </InputLabel>
                                            <Input
                                                type="text"
                                                required
                                                name="subjectCode"
                                                value={subjectCode}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className="d-flex justify-content-center mx-auto mt-4 pt-3 mb-4">
                                    <button type="submit" className="btn btn-lg pl-5 pr-5 btn-dark">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }
};

export default StudentMarksData;
