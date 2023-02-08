import React from 'react'
import { MdDashboard } from "react-icons/md";
import Teacher_form_filed from '../../component/Teacher_form_filed';
import { FaUserCircle } from "react-icons/fa";
import Upadate_img from "../../Images/Update_img.svg";

const Fees_page = () => {
  return (
    <div>
      <div className='container-fluid'>
            <div className='row mt-1'>
                <div className='col-md-6'>
                    <div className='main_text_all_panel mt-5'>
                        <MdDashboard style={{ fontSize: "30px", marginTop: "-15px" }} />
                        <h5 className='font-weight-normal d-inline ml-3'>Fees</h5>  
                        <div className=' mt-5'>
                            <h3 className='text-dark'>UPDATE DETAILS</h3>
                            <p className=''>Register Now ||</p>
                            <img className="img-fluid mt-3" src={Upadate_img} alt="Tchr" />
                        </div>
                    </div>
                </div>

                <div className='col-md-6 mt-5'>
                    <div className='container border  main_border_color '>
                        <div className='border Inner_border my-3 bg-white'>
                            <div className='d-flex justify-content-center mt-3'>
                                <FaUserCircle style={{ fontSize: "50px" }} className="icon_color" />
                            </div>
                            <h4 className='text-center'>Update Form</h4>
                            {/* <div className='row'>
                                <div className='col-md-6'>
                                    <Teacher_form_filed />
                                </div>
                                <div className='col-md-6'>
                                    <Teacher_form_filed />
                                </div>
                                <div className='col-md-6'>
                                    <Teacher_form_filed />
                                </div>
                                <div className='col-md-6'>
                                    <Teacher_form_filed />
                                </div>
                                <div className='col-md-6'>
                                    <Teacher_form_filed />
                                </div>
                                <div className='col-md-6'>
                                    <Teacher_form_filed />
                                </div>
                                <div className='col-md-6'>
                                    <Teacher_form_filed />
                                </div>
                                <div className='col-md-6'>
                                    <Teacher_form_filed />
                                </div>
                                <div class="d-flex justify-content-center mx-auto mt-4 pt-3 mb-4">
                                    <button type="submit" class="btn btn-lg pl-5 pr-5 btn-dark">Submit</button>
                                </div>
                            </div> */}
                            <div className='d-flex justify-content-around  flex-wrap'>
                                <Teacher_form_filed/>
                                <Teacher_form_filed/>
                                <Teacher_form_filed/>
                                <Teacher_form_filed/>
                                <Teacher_form_filed/>
                                <Teacher_form_filed/>
                                <Teacher_form_filed/>
                                <Teacher_form_filed/>
                            </div>
                            <div class="d-flex justify-content-center mx-auto mt-4 pt-3 mb-4">
                                    <button type="submit" class="btn btn-lg pl-5 pr-5 btn-dark">Submit</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Fees_page
