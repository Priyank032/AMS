import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import Teacher_form_filed from "../../component/Teacher_form_filed";
import { FaUserCircle } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import Tchr from "../../Images/Tchr.svg";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { useLocation } from 'react-router-dom'
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, useParams } from "react-router-dom";
import { getOneTeacher, UpdateTeacher } from "../../Service/api";

const Edit_Teacher = () => {
    const history = useNavigate();
    const location = useLocation();
    const initialValue = {
        name: "",
        username: "",
        email: "",
        phone: "",
    };

    useEffect(() => {
        const userInfo = localStorage.getItem("Dba");
        //console.log(userInfo._id);
        if (!userInfo) {
            history("/");
        }
        loadUserDetails();
    }, [history]);



    const [user, setUser] = useState(initialValue);
    const [error, setError] = useState("");
    // const { id } = useParams();
    
    const id = location.pathname.replace("/Dba/edit_Teacher/","");
    // alert(id || "no id")
    const {
        name,
        username,
        email,
        phone,
    } = user;

    const loadUserDetails = async () => {
        const response = await getOneTeacher(id);
        setUser(response.data);
    }

    const handleChange = (e) => {
        // console.log(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value });
    };


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const done = await UpdateTeacher(user, id);
            if (done) {
                alert("Teacher Updated Successfully")
                history(`/Dba/All_Teachers`);
            }
        } catch (error) {
            console.log(error.response.data.message);
        }


    };
    // console.log("hello");
    return (

        <div className="container-fluid">
            <div className="row mt-1">
                <div className="col-md-6">
                    <div className="main_text_all_panel mt-5">
                        <MdDashboard style={{ fontSize: "30px", marginTop: "-15px" }} />
                        <h5 className="font-weight-normal d-inline ml-3">
                            Teacher Update Form
                        </h5>
                        <div className=" mt-5">
                            <h3 className="text-dark">WANT TO UPDATE A TEACHER ?</h3>
                            <p className="">Update Now ||</p>
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
                            <h4 className="text-center">Update Form</h4>
                            <form onSubmit={submitHandler}>
                                <div className="d-flex justify-content-around  flex-wrap">
                                    <Box>
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
                                                Username
                                            </InputLabel>
                                            <Input
                                                type="text"
                                                name="username"
                                                value={username}
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
                                                Email
                                            </InputLabel>
                                            <Input
                                                type="email"
                                                name="email"
                                                value={email}
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
                                                Phone
                                            </InputLabel>
                                            <Input
                                                type="text"
                                                name="phone"
                                                value={phone}
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
    );
};

export default Edit_Teacher;
