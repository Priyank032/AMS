import React from 'react'
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import sidebarimg from "../../Images/sidebarimg.svg";
import { Link } from "react-router-dom"
const Teacher_Sidebar = () => {
    const history = useNavigate();
  const HandleLogout = (e) => {
    // e.preventDefault();
    localStorage.clear();
    history("/")
    //console.log("helopo");
  }
    return (
        <>
            <div className='Sidebar_for_all_panel' id="mySideBar">
                <ul>
                    <li>
                        <div>
                            <FaChalkboardTeacher style={{ fontSize: "24px" }} />
                            <Link to='/Teacher' className='d-inline'>Dashboard </Link>
                        </div>
                    </li>
                    <li>
                        <div>
                            <FaChalkboardTeacher style={{ fontSize: "24px" }} />
                            <Link to='/Teacher/Add_Attendence' className='d-inline'>Make Attendence</Link>
                        </div>
                    </li>
                    <li>
                        <div>
                            <FaChalkboardTeacher style={{ fontSize: "24px" }} />
                            <Link to='/Teacher/Add_Marks' className='d-inline'>Register Marks </Link>
                        </div>
                    </li>
                </ul>
                <div className='sidebarimg '>
                    <div className='ml-3'>
                        <img className="img-fluid " src={sidebarimg} alt="sidebarimg" />

                    </div>
                    <div className='Sidebar_logout ml-3 mt-5 mb-3 attech-bottom '>
                        <BiLogOut style={{ fontSize: "24px" }} />
                        <a href='' data-toggle="modal" data-target="#exampleModal" className='d-inline'>Logout</a>
                        {/* <Link to='/Dba/All_Students' className='d-inline '>Logout</Link> */}
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure to want to Logout?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Later</button>
                            <button type="button" onClick={(e) => HandleLogout()} data-dismiss="modal" className="btn btn-primary">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Teacher_Sidebar