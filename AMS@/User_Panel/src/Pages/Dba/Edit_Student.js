import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import Teacher_form_filed from '../../component/Teacher_form_filed';
import { FaUserCircle } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import Tchr from "../../Images/Tchr.svg";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@material-ui/core/TextField";
import { useNavigate } from "react-router-dom";
import { getOneStudent, UpdateStudent } from "../../Service/api";
import { useLocation } from 'react-router-dom'

const Edit_Student = () => {
    const history = useNavigate();
    const location = useLocation();
    const initialValue = {
        name: "",
        Father_name: "",
        Mother_name: "",
        DOB: "",
        Aadhar_no: "",
        SamagraId: "",
        Username: "",
        Email: "",
        Alternate_Email: "",
        Admission_no: "",
        Class: "",
        Section: "",
        Phone: "",
        Alternate_Phone: "",
        Blood_Group: "",
        Caste: "",
        Due_Fees: "",
        Total_Fees: "",
    };
    useEffect(() => {
        const DbaInfo = JSON.parse(localStorage.getItem("Dba"));
        if (!DbaInfo) {
            history("/");
            return
        }
        loadUserDetails();
    }, [history]);
    // const DbaInfo = JSON.parse(localStorage.getItem("Dba"));
    //console.log(DbaInfo.Dba._id);


    const [user, setUser] = useState(initialValue);
    const [error, setError] = useState("");

    const id = location.pathname.replace("/Dba/edit_Student/", "");
    const {
        name,
        Father_name,
        Mother_name,
        DOB,
        Aadhar_no,
        SamagraId,
        Username,
        Email,
        Alternate_Email,
        Admission_no,
        Class,
        Section,
        Phone,
        Alternate_Phone,
        Blood_Group,
        Caste,
        Due_Fees,
        Total_Fees,
    } = user;


    const loadUserDetails = async () => {
        const response = await getOneStudent(id);
        setUser(response.data);
    }


    const handleChange = (e) => {
        // console.log(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value });
    };



    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const done = await UpdateStudent(user, id);
            if (done) {
                alert("Student Updated Successfully")
                history(`/Dba/All_Students`);
            }
        } catch (error) {
            console.log(error.response.data.message);
        }

    };
    console.log("jiii");
    return (
        <div className='container-fluid'>
            <div className='row mt-1'>
                <div className='col-md-6'>
                    <div className='main_text_all_panel mt-5'>
                        <MdDashboard style={{ fontSize: "30px", marginTop: "-15px" }} />
                        <h5 className='font-weight-normal d-inline ml-3'>Student Update Form</h5>
                        <div className=' mt-5'>
                            <h3 className='text-dark'>WANT TO Update A Student ?</h3>
                            <p className=''>Update Now ||</p>
                            <img className="img-fluid mt-4" src={Tchr} alt="Tchr" />
                        </div>
                    </div>
                </div>

                <div className='col-md-6 mt-5  '>
                    <div className='container border   main_border_color '>
                        <div className='border Inner_border myFormClass my-3 bg-white'>
                            <div className='d-flex justify-content-center mt-3'>
                                <FaUserCircle style={{ fontSize: "50px" }} className="icon_color" />
                            </div>
                            <h4 className='text-center'>Updation Form</h4>
                            <form onSubmit={submitHandler}>
                                <div className='d-flex justify-content-around   flex-wrap'>
                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Full Name
                                            </InputLabel>
                                            <Input

                                                type="text"
                                                name="name"
                                                value={name}
                                                onChange={(e) => handleChange(e)}
                                                required
                                                placeholder="John Doe"
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Username
                                            </InputLabel>
                                            <Input
                                                type="text"
                                                name="Username"
                                                value={Username}
                                                onChange={(e) => handleChange(e)}
                                                required
                                                placeholder="JohnDPS@01"
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box >

                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Father Name
                                            </InputLabel>
                                            <Input
                                                type="text"
                                                name="Father_name"
                                                value={Father_name}
                                                onChange={(e) => handleChange(e)}
                                                required
                                                placeholder="Mr/Shri Johnson Doe"
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Mother Name
                                            </InputLabel>
                                            <Input
                                                type="text"
                                                name="Mother_name"
                                                value={Mother_name}
                                                onChange={(e) => handleChange(e)}
                                                required
                                                placeholder="Mrs/Smt Radhe Doe"
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password"  >
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Date of Birth
                                            </InputLabel>
                                            <Input
                                                type="date"
                                                name="DOB"
                                                value={DOB}
                                                onChange={(e) => handleChange(e)}
                                                required
                                            />
                                            {/* <TextField
                                                type="date"
                                                defaultValue="2019-05-24" inputProps={{ min: "2019-01-24", max: "2020-05-31" }}
                                            /> */}
                                        </FormControl>
                                    </Box>
                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Admission No
                                            </InputLabel>
                                            <Input
                                                type="text"
                                                name="Admission_no"
                                                value={Admission_no}
                                                onChange={(e) => handleChange(e)}
                                                required
                                                placeholder="0928cd12"
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Class
                                            </InputLabel>
                                            <Input
                                                type="number"
                                                name="Class"
                                                value={Class}
                                                onChange={(e) => handleChange(e)}
                                                required
                                                placeholder="5"
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box >
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

                                                placeholder="A"
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Aadhar Number (Optional)
                                            </InputLabel>
                                            <Input
                                                type="number"
                                                name="Aadhar_no"
                                                value={Aadhar_no}
                                                onChange={(e) => handleChange(e)}
                                                placeholder="1234-6547-7896"
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Samagra Id (Optional)
                                            </InputLabel>
                                            <Input
                                                type="number"
                                                name="SamagraId"
                                                value={SamagraId}
                                                onChange={(e) => handleChange(e)}
                                                placeholder="5698745"
                                            />
                                        </FormControl>
                                    </Box>

                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Email
                                            </InputLabel>
                                            <Input
                                                type="email"
                                                name="Email"
                                                value={Email}
                                                onChange={(e) => handleChange(e)}
                                                required
                                                placeholder="abc@gmail.com"
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Alternate_Email(optional)
                                            </InputLabel>
                                            <Input
                                                type="text"
                                                name="Alternate_Email"
                                                value={Alternate_Email}
                                                onChange={(e) => handleChange(e)}
                                                placeholder="xyx@gmail.com"
                                            />
                                        </FormControl>
                                    </Box>


                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Phone
                                            </InputLabel>
                                            <Input
                                                type="number"
                                                name="Phone"
                                                min="10"
                                                value={Phone}
                                                onChange={(e) => handleChange(e)}
                                                required
                                                placeholder="123-1234-123"
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Alternate Phone (Optional)
                                            </InputLabel>
                                            <Input
                                                type="text"
                                                name="Alternate_Phone"
                                                value={Alternate_Phone}
                                                onChange={(e) => handleChange(e)}
                                                min="10"

                                                placeholder="000-0000-000"
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Blood Group (Optional)
                                            </InputLabel>
                                            <Input
                                                type="text"
                                                name="Blood_Group"
                                                value={Blood_Group}
                                                onChange={(e) => handleChange(e)}

                                                placeholder="O+"
                                            />
                                        </FormControl>
                                    </Box>

                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Caste
                                            </InputLabel>
                                            <Input
                                                type="text"
                                                name="Caste"
                                                value={Caste}
                                                onChange={(e) => handleChange(e)}
                                                required
                                                placeholder="General/OBC/SC/ST"
                                            />
                                        </FormControl>
                                    </Box>

                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Due Fees
                                            </InputLabel>
                                            <Input
                                                type="number"
                                                name="Due_Fees"
                                                value={Due_Fees}
                                                onChange={(e) => handleChange(e)}
                                                required
                                                placeholder="10000"
                                            />
                                        </FormControl>
                                    </Box>

                                    <Box >
                                        <FormControl
                                            sx={{ m: 1, width: "25ch" }}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">
                                                <FaUserAlt style={{ marginRight: "7px" }} />
                                                Total_Fees
                                            </InputLabel>
                                            <Input
                                                type="number"
                                                name="Total_Fees"
                                                value={Total_Fees}
                                                onChange={(e) => handleChange(e)}
                                                required
                                                placeholder="10000"
                                            />
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className="d-flex justify-content-center mx-auto mt-4 pt-3 mb-4">
                                    <button type="submit" className="btn btn-lg pl-5 pr-5 btn-dark">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Edit_Student
