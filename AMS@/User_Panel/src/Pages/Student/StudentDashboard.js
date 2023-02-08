import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import tchr_dsbord_img from '../../Images/tch_dsh_img.svg'

const StudentDashboard = () => {
  const history = useNavigate();

  useEffect(() => {
    const StudentInfo = JSON.parse(localStorage.getItem("Student"));
    //console.log(userInfo._id);
    if (!StudentInfo) {
      history("/");
      return
    } else {
      localStorage.setItem("StudentID", StudentInfo.Student._id);
      localStorage.setItem("USERID", StudentInfo.Student._id);
      // localStorage.setItem("TeacherID", StudentInfo.Student._id);
      localStorage.setItem("InstituteID", StudentInfo.Student.institutionId);
      // getAllStudents();
    }
  }, [history]);

  return (
    <div className='container'>
      <div className='row mt-1'>

        <div className='col-12'>
          <div className='main_text_all_panel mt-5'>
            <MdDashboard style={{ fontSize: "30px", marginTop: "-15px" }} />
            <h3 className='font-weight-normal d-inline ml-3'> Student Dashboard</h3>
          </div>
        </div>
        <div className='container row my-5'>

          <div className='col-md-6 col-sm-12'>
            <img src={tchr_dsbord_img} className="img-fluid" />
          </div>
          <div className='col-md-6 col-sm-12 my-3 '>
            <div className='teacherCardContainer text-center p-2 mb-5'>
              <h2>Check attendence !!</h2>
              <p className='text-center font-weight-bolder '><a href="/">Click Here</a></p>
            </div>
            <div className='teacherCardContainer text-center p-2 '>
              <h2>Check Test Marks ?</h2>
              <p className='text-center font-weight-bolder '><a href="/">Click Here</a></p>
            </div>
          </div>
          <div className='col-12 mt-5'>
              <h1 className='text-center'>"The fact that you worry about being a good Student , means that you already one."</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard