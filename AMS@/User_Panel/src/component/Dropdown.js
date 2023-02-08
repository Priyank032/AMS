import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import DbaDropdown from "../component/dropdowns/DbaDropdown"
import AdminDropdown from "../component/dropdowns/AdminDropdown"
import StudentDropdown from "../component/dropdowns/StudentDropdown"
import TeacherDropdown from "../component/dropdowns/TeacherDropdown"
const Dropdown = ({ isOpen, toggle }) => {
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
    } else {
      if (TeacherInfo) {
        setShowSideBar("Teacher")
      } else if (DbaInfo) {
        setShowSideBar("Dba")
      } else if (StudentInfo) {
        setShowSideBar("Student")
      } else if (AdminInfo) {
        setShowSideBar("Admin")
      }
      else{
        return
      }
    }
  }, [history]);

 
  if (showSidedbar == "Dba") {
    return <DbaDropdown isOpen={isOpen} toggle={toggle} />
  } 
  if (showSidedbar == "Teacher") {
    return <TeacherDropdown isOpen={isOpen} toggle={toggle} />
  } 
  if (showSidedbar == "Admin") {
    return <AdminDropdown isOpen={isOpen} toggle={toggle} />
  }
  if (showSidedbar == "Student") {
    return <StudentDropdown isOpen={isOpen} toggle={toggle} />
  } else{
    return<></>
   }    
}

export default Dropdown
