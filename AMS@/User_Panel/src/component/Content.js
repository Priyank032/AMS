import React from "react";
import Dashboard_new from "../Pages/Dba/Dashboard_new";
import Admin_Dashboard from "../Admin_Panel/Admin_Dashboard";
import All_Users from "../Admin_Panel/All_Users";
import Add_User from "../Admin_Panel/Add_User";
import Edit_User from "../Admin_Panel/Edit_User";
import TeacherDashboard from "../Pages/Teacher/TeacherDashboard";
import YoutubePanel from "../Pages/Student/components/YoutubePanel";
import Teacher_form from "../Pages/Dba/Teacher_form";
import Student_Form from "../Pages/Dba/Student_Form";
import All_Teachers from "../Pages/Dba/All_Teachers"
import All_Students from "../Pages/Dba/All_Students"
import StudentData from "../Pages/Teacher/StudentData"
import StudentDashboard from "../Pages/Student/StudentDashboard"
import Show_Attendence from "../Pages/Student/Show_Attendence"
import Show_Marks from "../Pages/Student/Show_Marks"
import StudentMarksData from "../Pages/Teacher/StudentMarksData"
import UpdateStudentAttendenceData from "../Pages/Teacher/UpdateStudentAttendenceData"
import UpdateStudentMarksData from "../Pages/Teacher/UpdateStudentMarksData"
import All_Fees_Details from "../Pages/Dba/All_Fees_Details"
import Edit_Teacher from '../Pages/Dba/Edit_Teacher';
import Edit_Student from '../Pages/Dba/Edit_Student';
import FeesAdd from '../Pages/Dba/FeesAdd';
import Edit_Fees from '../Pages/Dba/Edit_Fees';
import UpdatePass from '../Pages/UpdatePass';
import Footer from "./Footer";
import { useLocation } from 'react-router-dom'
import Login from "../Pages/Login";
const Content = (props) => {

  const location = useLocation();

  var contentClass = props.isOpen ? "content open" : "content";
  return <div className={contentClass}>
    <div className="DataInContent">

      {location.pathname === '/Update-password' ? <UpdatePass /> : console.log()}

      {location.pathname === '/Dba' ? <Dashboard_new /> : console.log()}
      {location.pathname === '/Dba/Add_Teacher' ? <Teacher_form /> : console.log()}
      {location.pathname === '/Dba/Add_Student' ? <Student_Form /> : console.log()}
      {location.pathname === '/Dba/All_Teachers' ? <All_Teachers /> : console.log()}
      {location.pathname === '/Dba/All_Students' ? <All_Students /> : console.log()}
      {location.pathname === '/Dba/All_Fees_Details' ? <All_Fees_Details /> : console.log()}
      {/\/Dba\/edit_Teacher/.test(location.pathname) ? <Edit_Teacher /> : console.log()}
      {/\/Dba\/edit_Student/.test(location.pathname) ? <Edit_Student /> : console.log()}
      {/\/Dba\/Add_Fees/.test(location.pathname) ? <FeesAdd /> : console.log()}
      {/\/Dba\/edit_feeDetail/.test(location.pathname) ? <Edit_Fees /> : console.log()}

      {location.pathname === '/Teacher' ? <TeacherDashboard /> : console.log()}
      {location.pathname === '/Teacher/Add_Attendence' ? <StudentData /> : console.log()}
      {location.pathname === '/Teacher/Add_Marks' ? <StudentMarksData /> : console.log()}
      {location.pathname === '/Teacher/update_Attendence' ? <UpdateStudentAttendenceData /> : console.log()}
      {location.pathname === '/Teacher/update_Marks' ? <UpdateStudentMarksData /> : console.log()}

      {location.pathname === '/Student' ? <StudentDashboard /> : console.log()}
      {location.pathname === '/Student/Show_Attendence' ? <Show_Attendence /> : console.log()}
      {location.pathname === '/Student/Show_Marks' ? <Show_Marks /> : console.log()}
      {location.pathname === '/Student/Learning' ? <YoutubePanel /> : console.log()}

      {location.pathname === '/Admin' ? <Admin_Dashboard /> : console.log()}
      {location.pathname === '/Admin/All_Users' ? <All_Users /> : console.log()}
      {location.pathname === '/Admin/Add_User' ? <Add_User /> : console.log()}
      {/\/Admin\/edit_user/.test(location.pathname) ? <Edit_User /> : console.log()}
    </div>
    {/* <Footer/> */}

  </div>;
}

export default Content;
