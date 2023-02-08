import React, { useState, useEffect } from "react";
// import All_Student_card from "../component/All_Student_card";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Modal } from "react-bootstrap"
import { getFeesDetails, DeleteTeacher } from "../../Service/api";
import moment from "moment"

const All_Fees_Details = () => {
  const [show, setShow] = useState(false);
  const [StudentFeesId, setStudentFeesId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (id) => {

    setShow(true);
    setStudentFeesId(id);

  }

  const history = useNavigate();
  useEffect(() => {
    const DbaInfo = JSON.parse(localStorage.getItem("Dba"));
    //console.log(userInfo._id);
    if (!DbaInfo) {
      history("/");
      return
    }
    getAllfeesDetails();
  }, [history]);
  const [users, setUsers] = useState([]);

  const USERID = localStorage.getItem("DbaID");
  const initialValue = {
    institutionId: USERID,
  };
  //console.log(DbaInfo.Dba._id);
  //const institutionId = DbaInfo.Dba._id;


  const [user, setUser] = useState(initialValue);
  const getAllfeesDetails = async () => {
    try {
      let response = await getFeesDetails(user);
      setUsers(response.data);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleDelete = async (id) => {
  //     // e.preventDefault();
  //     await DeleteTeacher(id);
  //     handleClose()
  //     alert("Teacher Deleted Successfully")
  //     getAllfeesDetails();
  // }
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
      name: "Father Name",
      label: "Father Name",
      options: {
        filter: true,
        sort: true,
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
      name: "Submitted Fees",
      label: "Submitted Fees",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Date of Submit",
      label: "Date of Submit",
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
        download: false,
      },
    },
    {
      name: "Delete",
      label: "Delete",
      options: {
        filter: false,
        sort: false,
        download: false,
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

  const data = users.map((feeDetail) => (

    [feeDetail.name, feeDetail.Father_name, feeDetail.Class, feeDetail.Submitted_Fees, moment(feeDetail.createdAt).format('MMMM Do YYYY, h:mm:ss a'), <Link to={`Dba/edit_feeDetail/${feeDetail._id}`}><EditIcon /></Link>, <Button onClick={(e) => handleShow(feeDetail._id)} ><DeleteIcon /></Button>]
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
          {/* <Button variant="primary" onClick={()=>handleDelete(StudentFeesId)}> */}
          <Button variant="primary">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default All_Fees_Details;
