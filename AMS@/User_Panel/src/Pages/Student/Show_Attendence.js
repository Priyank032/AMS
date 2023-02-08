import React, { useState, useEffect } from "react";
// import All_Student_card from "../component/All_Student_card";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Button,Modal} from "react-bootstrap"
import { getStudentsAttendence,DeleteTeacher } from "../../Service/api";
import moment from "moment";
const Show_Attendence = () => {
  

  const history = useNavigate();
  useEffect(() => {
    const StudentInfo = JSON.parse(localStorage.getItem("Student"));
    if (!StudentInfo) {
      history("/");
      return
    }
    else {
        localStorage.setItem("StudentClass", StudentInfo.Student.Class);
        localStorage.setItem("Section", StudentInfo.Student.Section);
        // localStorage.setItem("TeacherID", StudentInfo.Student._id);
        // localStorage.setItem("InstituteID", StudentInfo.Student.institutionId);
        // getAllStudents();
        getAllAttendence();
      }
  }, [history]);
  const [users, setUsers] = useState([]);
  const [usersBasic, setUsersBasic] = useState([]);
 
  const USERID = localStorage.getItem("StudentID");
  const institituteID = localStorage.getItem("InstituteID");
  const StudentClass = localStorage.getItem("StudentClass");
  const StudentSection = localStorage.getItem("Section");

  const initialValue = {
    institutionId: institituteID,
    Section: StudentSection,
    Class: StudentClass,
    id: USERID,
  };
  const [user, setUser] = useState(initialValue);
  //console.log(DbaInfo.Dba._id);
  //const institutionId = DbaInfo.Dba._id;


  const getAllAttendence = async() => {
    try {
      let response = await getStudentsAttendence(user);
     setUsers(response.data);
    //  setUsersBasic(response.data.normalData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  const theme = createTheme({
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: "red",
          //   borderRadius:"100px"
        },
        paper: {
          borderRadius: "20px",
        },
      },
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "#FF000",
        },
      },
    },
  });

  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

  const columns = [
    {
      name: "Name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
   
    {
      name: "Attendence",
      label: "Attendence",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
      },
    }, 
    
    
  ];

  //const columns = ["Name", "Username", "Email", "Phone","Action","Edit Action"];

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
  };
  
  const data = users.map((student) => (
    // console.log(student)
    [student.name,student.present?"Present":"Absent",moment(student.date).format("DD/MM/YYYY")]
    ))
   
   
  

  return (
    <div className="container">
      <div className="container main_container py-4 ">
        <h4 className="text-center border-bottom border-dark pb-1">
          Data Panel
        </h4>
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title={"All Teachers"}
            data={data}
            columns={columns}
            options={options} 

          />
        </ThemeProvider>
      </div>
     

    </div>
  );
};

export default Show_Attendence;
