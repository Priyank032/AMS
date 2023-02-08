import React, { useState, useEffect } from "react";
// import All_Student_card from "../component/All_Student_card";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Button,Modal} from "react-bootstrap"
import { getStudents,DeleteStudent } from "../../Service/api";
const All_Students = () => {
  const [show, setShow] = useState(false);
  const [StudentID, setStudentID] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (id) =>{
    
    setShow(true);
    setStudentID(id);
    
  } 
    
  const history = useNavigate();
  useEffect(() => {
    const DbaInfo = JSON.parse(localStorage.getItem("Dba"));
    //console.log(userInfo._id);
    if (!DbaInfo) {
      history("/");
      return
    }
    getAllStudents();
  }, [history]);
  const [users, setUsers] = useState([]);
 
  const USERID = localStorage.getItem("DbaID");
  const initialValue = {
    institutionId: USERID,
  };
  const [user, setUser] = useState(initialValue);
  //console.log(DbaInfo.Dba._id);
  //const institutionId = DbaInfo.Dba._id;


  const getAllStudents = async() => {
    try {
      let response = await getStudents(user);
     setUsers(response.data);
     // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    // e.preventDefault();
    await DeleteStudent(id);
    handleClose()
    alert("Student Deleted Successfully")
    getAllStudents();
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
      name: "S.No",
      label: "S.No",
      options: {
        filter: false,
        sort: true,
        download:false,
      },
    },
    {
        name: "Name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Father's Name",
        label: "Father's Name",
        options: {
          filter: false,
          sort: false,
        },
      },
    {
      name: "Username",
      label: "Username",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Email",
      label: "Email",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Class",
      label: "Class",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Phone",
      label: "Phone",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Caste",
      label: "Caste",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Due Fees",
      label: "Due Fees",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Total fees",
      label: "Total fees",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Add Fees",
      label: "Add Fees",
      options: {
        filter: false,
        sort: false,
        download:false,
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
    selectableRowsHideCheckboxes: true,
  };
  var i =0;
  const data = users.map((student) => (
        [++i,student.name,student.Father_name,student.Username,student.email,student.Class,student.Phone,student.Caste, student.Due_Fees, student.Total_Fees,<Link to={`Dba/Add_Fees/${student._id}`}><EditIcon/> Add Fees</Link>,<Link to={`Dba/edit_Student/${student._id}`}><EditIcon/></Link>,<Button onClick={(e)=>handleShow(student._id)} ><DeleteIcon/></Button>]
      ))
   
//    users.map((student)=>{
//        console.log(student.DOB.getDate());
//    })
  

  return (
    <div className="container">
      <div className="container main_container py-4 ">
        <h4 className="text-center border-bottom border-dark pb-1">
          Data Panel
        </h4>
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title={"All Students"}
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
          <Button variant="primary" onClick={()=>handleDelete(StudentID)}>
           Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default All_Students;
