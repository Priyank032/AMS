import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Dba_Sidebar from './sidebar/Dba_Sidebar';
import Teacher_Sidebar from './sidebar/Teacher_Sidebar';
import Admin_Sidebar from './sidebar/Admin_Sidebar';
import Student_Sidebar from './sidebar/Student_Sidebar';
const SideBarFinal = () => {

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
    return <Dba_Sidebar />
  } 
  if (showSidedbar == "Teacher") {
    return <Teacher_Sidebar />
  } 
  if (showSidedbar == "Admin") {
    return <Admin_Sidebar />
  }
  if (showSidedbar == "Student") {
    return <Student_Sidebar />
  } else{
    return<></>
   }


}

export default SideBarFinal
