import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import tchr_dsbord_img from '../../Images/tch_dsh_img.svg'
const TeacherDashboard = () => {
  const history = useNavigate();

  useEffect(() => {
    const TeacherInfo = JSON.parse(localStorage.getItem("Teacher"));
    //console.log(userInfo._id);
    if (!TeacherInfo) {
      history("/");
      return
    } else {

      localStorage.setItem("TeacherID", TeacherInfo.Teacher._id);
      localStorage.setItem("InstituteID", TeacherInfo.Teacher.institutionId);
      // getAllStudents();
    }
  }, [history]);

  return (
    <div className='container'>
      <div className='row mt-1'>

        <div className='col-12'>
          <div className='main_text_all_panel mt-5'>
            <MdDashboard style={{ fontSize: "30px", marginTop: "-15px" }} />
            <h3 className='font-weight-normal d-inline ml-3'> Teacher Dashboard</h3>
          </div>
        </div>
        <div className='container row my-5'>

          <div className='col-md-6 col-sm-12'>
            <img src={tchr_dsbord_img} className="img-fluid" />
          </div>
          <div className='col-md-6 col-sm-12 my-3 '>
            <div className='teacherCardContainer text-center p-2 mb-5'>
              <h2>Submit today's attendence !!</h2>
              <p className='text-center font-weight-bolder '><a href="/">Click Here</a></p>
            </div>
            <div className='teacherCardContainer text-center p-2 '>
              <h2>Wanna Update Test Marks ?</h2>
              <p className='text-center font-weight-bolder '><a href="/">Click Here</a></p>
            </div>
          </div>
          <div className='col-12 mt-5'>
              <h1 className='text-center'>"The fact that you worry about beirng a good teacher , means that you already one."</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard