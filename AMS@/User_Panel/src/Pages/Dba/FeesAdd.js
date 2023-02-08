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
import { getOneStudent, FeesRegistration } from "../../Service/api";
import { useLocation } from 'react-router-dom'

const FeesAdd = () => {
    const history = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const DbaInfo = JSON.parse(localStorage.getItem("Dba"));
        if (!DbaInfo) {
            history("/");
            return
        }
        loadUserDetails();
    }, [history]);
    const USERID = localStorage.getItem("DbaID");
    //console.log(DbaInfo.Dba._id);
    const initialValue = {
        name: "",
        Father_name: "",
        Class: "",
        Section: "",
        Submitted_Fees: "",
        institutionId: USERID,
    };

    const [user, setUser] = useState(initialValue);
    const [error, setError] = useState("");

    const id = location.pathname.replace("/Dba/Add_Fees/", "");
    const {
        name,
        Father_name,
        Class,
        Section,
        Submitted_Fees,
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
            const { data } = await FeesRegistration(user);
            if (data) {
                alert("Fees regsiter Successfully")
                history(`/Dba`);
            }
        } catch (error) {
            console.log(error.response.data.message);
        }

    };
    // console.log("jiii");
    return (
        <div className='container-fluid'>
            <div className='row mt-1'>
                <div className='col-md-6'>
                    <div className='main_text_all_panel mt-5'>
                        <MdDashboard style={{ fontSize: "30px", marginTop: "-15px" }} />
                        <h5 className='font-weight-normal d-inline ml-3'>Fees Registration Form</h5>
                        <div className=' mt-5'>
                            <h3 className='text-dark'>WANT TO register a fees ?</h3>
                            <p className=''>Register Now ||</p>
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
                            <h4 className='text-center'>Fees Registration Form</h4>
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
                                                Enter Amount
                                            </InputLabel>
                                            <Input
                                                type="number"
                                                name="Submitted_Fees"
                                                value={Submitted_Fees}
                                                onChange={(e) => handleChange(e)}
                                                required
                                                placeholder="2000"
                                            />
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className="d-flex justify-content-center mx-auto mt-4 pt-3 mb-4">
                                    <button type="submit" className="btn btn-lg pl-5 pr-5 btn-dark">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FeesAdd
