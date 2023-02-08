import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
// import Teacher_form_filed from "../../component/Teacher_form_filed";
import { FaUserCircle } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import Tchr from "./../Images/Tchr.svg";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Add_School } from "./../Service/api";

const Add_User = () => {
  const history = useNavigate();
  useEffect(() => {
    const DbaInfo = JSON.parse(localStorage.getItem("Admin"));
    if (!DbaInfo) {
      history("/");
      return
    }
  }, [history]);
  // const USERID = localStorage.getItem("DbaID");
  //console.log(DbaInfo.Dba._id);
  const initialValue = {
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    city:"",
    state:"",
    pincode:"",
    attendence_type:"",
    showPassword: false,
  };

  const [user, setUser] = useState(initialValue);
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");

  const {
    name,
    username,
    email,
    phone,
    password,
    city,
    state,
    pincode,
    attendence_type,
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
    // console.log("hii");
    if (password !== cpassword) {
      alert("password doesnt match");
    } else {
      try {
        // setLoading(true)

        const { data } = await Add_School(user);
        console.log(data);
        alert("School Registered Successfully")
        history(`/Admin/All_Users`);
        //	localStorage.setItem("dbaInfo", JSON.stringify(data));
        // setLoading(false)
      } catch (error) {
        //	setError(error.response.data.message);
        //  setLoading(false)
        console.log(error.response.data.message);
      }
    }
  };
  return (
    <div className="container-fluid">
      <div className="row mt-1">
        <div className="col-md-6">
          <div className="main_text_all_panel mt-5">
            <MdDashboard style={{ fontSize: "30px", marginTop: "-15px" }} />
            <h5 className="font-weight-normal d-inline ml-3">
              School Registration Form
            </h5>
            <div className=" mt-5">
              <h3 className="text-dark">WANT TO ADD A School ?</h3>
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
              <h4 className="text-center">Registration Form</h4>
              <form onSubmit={submitHandler}>
                <div className="d-flex justify-content-around  flex-wrap">
                  <Box>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="standard-adornment-password">
                        <FaUserAlt style={{ marginRight: "7px" }} />
                        School Name
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
                        type="number"
                        name="phone"
                        value={phone}
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
                        City
                      </InputLabel>
                      <Input
                        type="text"
                        name="city"
                        value={city}
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
                        State
                      </InputLabel>
                      <Input
                        type="text"
                        name="state"
                        value={state}
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
                        Pincode
                      </InputLabel>
                      <Input
                        type="number"
                        name="pincode"
                        value={pincode}
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
                        Attendence Type
                      </InputLabel>
                      <Input
                        type="text"
                        name="attendence_type"
                        value={attendence_type}
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

                  <Box>
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

export default Add_User;
