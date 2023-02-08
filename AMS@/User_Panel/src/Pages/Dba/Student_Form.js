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
import { StudentRegistration } from "../../Service/api";

const Student_Form = () => {
    const history = useNavigate();
    useEffect(() => {
        const DbaInfo = JSON.parse(localStorage.getItem("Dba"));
        if (!DbaInfo) {
            history("/");
            return
        }
    }, [history]);
    const USERID = localStorage.getItem("DbaID");
    //console.log(DbaInfo.Dba._id);
    const initialValue = {
        name: "",
        Father_name: "",
        Mother_name: "",
        DOB: "",
        Aadhar_no: "",
        SamagraId: "",
        Username: "",
        password: "",
        email: "",
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
        institutionId: USERID,
        showPassword: false,
    };

    const [user, setUser] = useState(initialValue);
    const [inputType, setinputType] = useState("text");
    const [cpassword, setCpassword] = useState("");
    const [error, setError] = useState("");

    const {
        name,
        Father_name,
        Mother_name,
        DOB,
        Aadhar_no,
        SamagraId,
        Username,
        password,
        email,
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
        institutionId,
        showPassword,
    } = user;

    const handleChange = (e) => {
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
            alert("password doesnt match")
        } else {
            try {
                // setLoading(true)

                const { data } = await StudentRegistration(user);
                console.log(data);
                alert("Student Registered Successfully")
                history(`/Dba/All_Students`);
                //	localStorage.setItem("dbaInfo", JSON.stringify(data));
                // setLoading(false)
            } catch (error) {
                //	setError(error.response.data.message);
                //  setLoading(false)
                console.log(error.response.data.message);
            }
        }

    };
    const typeChange = () => {
        setinputType("date")
    }
    return (
        <div className='container-fluid'>
            <div className='row mt-1'>
                <div className='col-md-6'>
                    <div className='main_text_all_panel mt-5'>
                        <MdDashboard style={{ fontSize: "30px", marginTop: "-15px" }} />
                        <h5 className='font-weight-normal d-inline ml-3'>Student Registration Form</h5>
                        <div className=' mt-5'>
                            <h3 className='text-dark'>WANT TO ADD A Student ?</h3>
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
                            <h4 className='text-center'>Registration Form</h4>
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
                                                type={inputType}
                                                onClick={typeChange}
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
                                                name="email"
                                                value={email}
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

                                    <Box >
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
                                                required
                                                placeholder="Enter Password"
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

                                    <Box >
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
                                                required
                                                placeholder="Re-enter Password"
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

export default Student_Form
