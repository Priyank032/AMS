import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import login_img from "../Images/login_img.svg";
import { FaUserAlt } from "react-icons/fa";
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
import { LoginAll } from "../Service/api";
import { Link } from "react-router-dom";
const Login = () => {
  const history = useNavigate();
  const initialValue = {
    email: "",
    password: "",
    showPassword: false,
  };

  const [user, setUser] = useState(initialValue);
  // const [error, setError] = useState("");

  const { email, password, showPassword } = user;

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

    try {
      // setLoading(true)
      const  {data}  = await LoginAll(user);
     // console.log(data);
      localStorage.setItem(`${data.name}`, JSON.stringify(data));
      history(`/${data.name}`);
      //setLoading(false)
    } catch (error) {
      //	setError(error.response.data.message);
      //  setLoading(false)
      console.log(error.response);
      alert(error.response.data.message)
    }
  };

  return (
    <div className="container">
      <div className="container pl-5 main_container mt-5 py-5">
        <div className="row">
          <div className=" col-md-6 d-none d-md-block  my-4 rightSideBorder">
            <img className="img-fluid " src={login_img} alt="login_hero_image" />
          </div>
          <div className=" col-md-6 col-sm-12 login_right_side  my-4">
            <form onSubmit={submitHandler}>
              <h1 className=" text-center mb-4">Login Form</h1>
              <div className="row ">
                <div className="col-12 d-flex justify-content-center mb-4 ">
                  <Box sx={{ display: "flex", flexWrap: "wrap" }}>
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
                </div>
                <div className="col-12 d-flex justify-content-center">
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
                        name="password"
                        value={password}
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
                      <Link className="mt-2" to="/forgot_password">
                        Forgot Password?
                      </Link>
                    </FormControl>
                  </Box>
                </div>
              </div>

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
  );
};

export default Login;
