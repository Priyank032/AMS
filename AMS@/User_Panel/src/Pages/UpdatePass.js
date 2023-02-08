import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { UpdatePassword } from "../Service/api";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import login_img from "../Images/login_img.svg";

const UpdatePass = () => {
    const history = useNavigate();
    const [showSidedbar, setShowSideBar] = useState("")
    useEffect(() => {
        const TeacherInfo = JSON.parse(localStorage.getItem("Teacher"));
        const DbaInfo = JSON.parse(localStorage.getItem("Dba"));
        const StudentInfo = JSON.parse(localStorage.getItem("Student"));
        const AdminInfo = JSON.parse(localStorage.getItem("Admin"));
        //console.log(userInfo._id);
        if (!TeacherInfo && !DbaInfo && !StudentInfo && !AdminInfo) {
            history("/");
            return
        } 
        
    }, [history]);

    const USERI = localStorage.getItem("USERID");
    const initialValue = {
        oldpassword: "",
        password: "",
        _id: USERI,
        showPassword: false,
    };

    const [user, setUser] = useState(initialValue);
    const [cpassword, setCpassword] = useState("");
    const { password, showPassword,oldpassword } = user;

    const handleChange = (e) => {
        e.preventDefault();

        // console.log(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleClickShowPassword = () => {
        setUser({
            ...user,
            showPassword: !showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            alert("new Password and confirm password doesnt match");
        } else {
            try {
                // setLoading(true)
                const { data } = await UpdatePassword(user);
                //console.log(data);
                // localStorage.clear();
                 alert(`${data.message} and Now you can login with Your New Password`);
                // history("/")
                //history("/reset-password");
                //	localStorage.setItem("dbaInfo", JSON.stringify(data));
                // setLoading(false)
            } catch (error) {
                //	setError(error.response.data.message);
                //  setLoading(false)
                console.log(error.response);
            }
        }
    };
    return (
        <>
            <div className="container">
                <div className="container main_container my-5 py-5">
                    <div className="row">
                        <div className="col-md-6 d-none d-md-block  my-4 rightSideBorder">
                            <img className="img-fluid " src={login_img} alt="login_hero_image" />
                        </div>
                        <div className="col-md-6 col-sm-12 my-4">
                            <h2 className="text-center">Update Password</h2>
                            <form onSubmit={submitHandler}>
                                <div className="d-flex justify-content-center">
                                    <div className="row ">
                                        <div className="col-12 d-flex justify-content-center mt-4">
                                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                                <FormControl
                                                    sx={{ m: 1, width: "25ch" }}
                                                    variant="standard"
                                                >
                                                    <InputLabel htmlFor="standard-adornment-password">
                                                        <AiFillLock style={{ marginRight: "7px" }} />
                                                        Current Password
                                                    </InputLabel>
                                                    <Input
                                                        id="standard-adornment-password"
                                                        type={showPassword ? "text" : "password"}
                                                        value={oldpassword}
                                                        name="oldpassword"
                                                        onChange={(e) => handleChange(e)}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                >
                                                                    {showPassword ? (
                                                                        <VisibilityOff />
                                                                    ) : (
                                                                        <Visibility />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </Box>
                                        </div>
                                        <div className="col-12 d-flex justify-content-center mt-4">
                                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                                <FormControl
                                                    sx={{ m: 1, width: "25ch" }}
                                                    variant="standard"
                                                >
                                                    <InputLabel htmlFor="standard-adornment-password">
                                                        <AiFillLock style={{ marginRight: "7px" }} />
                                                        Password
                                                    </InputLabel>
                                                    <Input
                                                        id="standard-adornment-password"
                                                        type={showPassword ? "text" : "password"}
                                                        value={password}
                                                        name="password"
                                                        onChange={(e) => handleChange(e)}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                >
                                                                    {showPassword ? (
                                                                        <VisibilityOff />
                                                                    ) : (
                                                                        <Visibility />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </Box>
                                        </div>
                                        <div className="col-12 d-flex justify-content-center">
                                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                                <FormControl
                                                    sx={{ m: 1, width: "25ch" }}
                                                    variant="standard"
                                                >
                                                    <InputLabel htmlFor="standard-adornment-password">
                                                        <AiFillLock style={{ marginRight: "7px" }} />
                                                        Confirm Password
                                                    </InputLabel>
                                                    <Input
                                                        id="standard-adornment-password"
                                                        type={showPassword ? "text" : "password"}
                                                        name="cpassword"
                                                        value={cpassword}
                                                        onChange={(e) => setCpassword(e.target.value)}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                >
                                                                    {showPassword ? (
                                                                        <VisibilityOff />
                                                                    ) : (
                                                                        <Visibility />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </Box>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center ml-5">Have an Account? Login</p>
                                <div className="text-center mt-4 ">
                                    <Button type="submit" variant="outlined">
                                        submit
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdatePass;
