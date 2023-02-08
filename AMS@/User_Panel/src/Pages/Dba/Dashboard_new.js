import React,{useEffect} from 'react'
import Card from '../../component/Card'
import { MdDashboard } from "react-icons/md";
import image from "../../Images/image.png";
// import Sidebar from './Sidebar';
import { useNavigate } from "react-router-dom";


const Dashboard_new = () => {
    const history = useNavigate();
    useEffect(() => {
        const DbaInfo = JSON.parse(localStorage.getItem("Dba"));
        //console.log(userInfo._id);
        if (!DbaInfo) {
          history("/");
          return
        } else {
          localStorage.setItem("DbaID", DbaInfo.Dba._id);
          localStorage.setItem("USERID", DbaInfo.Dba._id);
          // getAllStudents();
        }
      }, [history]);
    
    //   const Dbakid = localStorage.getItem("DbaID");
  return (
    <div className='container-fluid'>
      <div className='row mt-1'>
          {/* <div className='col-2 d-none d-md-block'>
              <SideBarFinal/>
              <Sidebar/>
          </div> */}
          <div className='col-12'>
              <div className='main_text_all_panel mt-5'>
              <MdDashboard style={{ fontSize: "30px" , marginTop:"-15px"}}/>
              <h3 className='font-weight-normal d-inline ml-3'>Dashboard</h3>
              </div>
              <div className='row mt-4'>
              <div className='col-md-6 col-lg-3 col-sm-6'>
                  <Card/>
              </div>
              <div className='col-md-6 col-lg-3 col-sm-6'>
                  <Card/>
              </div>
              <div className='col-md-6 col-lg-3 col-sm-6'>
                  <Card/>
              </div>
              <div className='col-md-6 col-lg-3 col-sm-6'>
                  <Card/>
              </div>
              </div>
              <img className="img-fluid mt-4" src={image} alt="image" />
          </div>
      </div>
    </div>
  )
}

export default Dashboard_new
