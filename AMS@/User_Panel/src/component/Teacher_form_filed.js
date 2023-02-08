import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const Teacher_form_filed = () => {
    const [values, setValues] = React.useState({
        username: "",
        password: "",
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>
           
                <Box >
                    <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">
                            <FaUserAlt style={{ marginRight: "7px" }} />
                            Username
                        </InputLabel>
                        <Input
                            type="text"
                            value={values.username}
                            onChange={handleChange("username")}
                        />
                    </FormControl>
                </Box>
           
        </>
    )
}

export default Teacher_form_filed
