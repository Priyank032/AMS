import React, { useState, useEffect } from "react";
// import All_Student_card from "../component/All_Student_card";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Button,Modal} from "react-bootstrap"
import { getTeachers,DeleteTeacher } from "../../Service/api";
const All_Teachers = () => {
  const [show, setShow] = useState(false);
  const [TeacherID, setTeacherID] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (id) =>{
    
    setShow(true);
    setTeacherID(id);
    
  } 

  const history = useNavigate();
  useEffect(() => {
    const DbaInfo = JSON.parse(localStorage.getItem("Dba"));
    if (!DbaInfo) {
      history("/");
      return
    }
    getAllTeachers();
  }, [history]);
  const [users, setUsers] = useState([]);
 
  const USERID = localStorage.getItem("DbaID");
  const initialValue = {
    institutionId: USERID,
  };
  const [user, setUser] = useState(initialValue);
  //console.log(DbaInfo.Dba._id);
  //const institutionId = DbaInfo.Dba._id;


  const getAllTeachers = async() => {
    try {
      let response = await getTeachers(user);
     setUsers(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    // e.preventDefault();
    await DeleteTeacher(id);
    handleClose()
    alert("Teacher Deleted Successfully")
    getAllTeachers();
}
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
      name: "Username",
      label: "Username",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Phone",
      label: "Phone",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Edit",
      label: "Edit",
      options: {
        filter: false,
        sort: false,
        download:false,
      },
    },
    {
      name: "Delete",
      label: "Delete",
      options: {
        filter: false,
        sort: false,
        download:false,
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
  
  const data = users.map((Teacher) => (
        [Teacher.name, Teacher.username, Teacher.email,Teacher.phone,<Link to={`Dba/edit_Teacher/${Teacher._id}`}><EditIcon/></Link>,<Button onClick={(e)=>handleShow(Teacher._id)} ><DeleteIcon/></Button>]
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Later
          </Button>
          <Button variant="primary" onClick={()=>handleDelete(TeacherID)}>
           Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default All_Teachers;
