import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/js/bootstrap.bundle'
import Navbar from './component/Navbar';
import Navbar_Phone from './component/Navbar_Phone';
import SideDrawer from './component/SideDrawer';
import {Routes, Route} from 'react-router-dom';
import Dashboard_new from "./Pages/Dba/Dashboard_new";
import TeacherDashboard from "./Pages/Teacher/TeacherDashboard";
import Admin_Dashboard from "./Admin_Panel/Admin_Dashboard";
import All_Users from "./Admin_Panel/All_Users";
import Add_User from "./Admin_Panel/Add_User";
import Edit_User from "./Admin_Panel/Edit_User";
import Teacher_form from "./Pages/Dba/Teacher_form";
import Student_Form from "./Pages/Dba/Student_Form";
import Login from './Pages/Login';
import ForgotPass from './Pages/ForgotPass';
import UpdatePass from './Pages/UpdatePass';
import ConfirmPass from './Pages/ConfirmPass';
import { useLocation } from 'react-router-dom'
import All_Teachers from './Pages/Dba/All_Teachers';
import All_Students from './Pages/Dba/All_Students';
import StudentData from './Pages/Teacher/StudentData';
import StudentMarksData from './Pages/Teacher/StudentMarksData';
import UpdateStudentAttendenceData from './Pages/Teacher/UpdateStudentAttendenceData';
import UpdateStudentMarksData from './Pages/Teacher/UpdateStudentMarksData';
import All_Fees_Details from './Pages/Dba/All_Fees_Details';
import Edit_Teacher from './Pages/Dba/Edit_Teacher';
import Edit_Student from './Pages/Dba/Edit_Student';
import FeesAdd from './Pages/Dba/FeesAdd';
import Edit_Fees from './Pages/Dba/Edit_Fees';
import YoutubePanel from "./Pages/Student/components/YoutubePanel";
import StudentDashboard from "./Pages/Student/StudentDashboard"
import Show_Attendence from "./Pages/Student/Show_Attendence"
import Show_Marks from "./Pages/Student/Show_Marks"

function App() {
  const location = useLocation();
  // {	location.pathname === '/' ?   <Login /> : console.log()}
  return (
    <>
    {
      location.pathname === '/' ||location.pathname === '/forgot_password'||location.pathname === '/reset-password'? <Navbar_Phone />:<><Navbar />  <SideDrawer />  </>
    }
        {/* <SideDrawer /> */}
        <Routes>
          <Route exact path={"/"} element={<Login />} />
          <Route exact path={"/forgot_password"} element={<ForgotPass />} /> 
          <Route exact path={"/reset-password"} element={<ConfirmPass /> } /> 
          <Route exact path={"/Update-password"} element={UpdatePass  } /> 
          <Route exact path={"/Dba"} element={Dashboard_new} />
          <Route exact path={"/Dba/Add_Teacher"} element={Teacher_form } /> 
          <Route exact path={"/Dba/Add_Student"} element={Student_Form } /> 
          <Route exact path={"/Dba/All_Teachers"} element={All_Teachers }  /> 
          <Route exact path={"/Dba/All_Students"} element={All_Students }  /> 
          <Route exact path={"/Dba/All_Fees_Details"} element={All_Fees_Details }  /> 
          <Route exact path={"/Dba/edit_Teacher/:id"} element={Edit_Teacher} />
          <Route exact path={"/Dba/edit_Student/:id"} element={Edit_Student} />
          <Route exact path={"/Dba/Add_Fees/:id"} element={FeesAdd} />
          <Route exact path={"/Dba/edit_feeDetail/:id"} element={Edit_Fees} />

          <Route exact path={"/Teacher"} element={TeacherDashboard} />
          <Route exact path={"/Teacher/Add_Attendence"} element={StudentData} />
          <Route exact path={"/Teacher/Add_Marks"} element={StudentMarksData} />
          <Route exact path={"/Teacher/update_Attendence"} element={UpdateStudentAttendenceData} />
          <Route exact path={"/Teacher/update_Marks"} element={UpdateStudentMarksData} />

          <Route exact path={"/Student"} element={StudentDashboard} /> 
          <Route exact path={"/Student/Show_Attendence"} element={Show_Attendence} /> 
          <Route exact path={"/Student/Show_Marks"} element={Show_Marks} /> 
          <Route exact path={"/Student/Learning"} element={YoutubePanel} /> 

          <Route exact path={"/Admin"} element={Admin_Dashboard} />
          <Route exact path={"/Admin/All_Users"} element={All_Users} />
          <Route exact path={"/Admin/Add_User"} element={Add_User} />
          <Route exact path={"/Admin/edit_user/:id"} element={Edit_User} />
        </Routes>
     
    </>
  );
}

export default App;
