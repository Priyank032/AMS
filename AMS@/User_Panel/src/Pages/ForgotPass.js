import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ForgotPassword } from "../Service/api";
import { useNavigate } from "react-router-dom";
import login_img from "../Images/login_img.svg";

const ForgotPass = () => {
  const initialValue = {
    email: "",
  };

  const [user, setUser] = useState(initialValue);
  const [error, setError] = useState("");
  const history = useNavigate();

  const { email } = user;

  const handleChange = (e) => {
    // console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // setLoading(true)
      const { data } = await ForgotPassword(user);
      console.log(data);
      alert(data.message);
      //history("/reset-password");
      //	localStorage.setItem("dbaInfo", JSON.stringify(data));
      // setLoading(false)
    } catch (error) {
      //	setError(error.response.data.message);
      //  setLoading(false)
      console.log(error.response.data.message);
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
          <form onSubmit={submitHandler}>
            <h2 className="text-center pb-2 mt-2">Forgot Password</h2>
            <p className="text-center pb-2">
              Enter your registered email address.
            </p>
            <div className="d-flex justify-content-center mt-4">
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
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
            <Link className="text-decoration-none" to="/">
              {" "}
              <p className="text-center text-dark text-decoration-none ml-5">
                Have an Account? Login
              </p>
            </Link>

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

export default ForgotPass;
