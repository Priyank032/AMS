import React from "react";
import { CgProfile } from "react-icons/cg";
const Navbar_Phone = () => {
  return (
    <div className="">
      <div className="container-fluid headar">
        <div className="row">
          <div className="col-6 col-md-2 header_logo_text">
            <h1 className="mt-3 ml-1">AMH</h1>
          </div>
          <div className="col-md-6 d-none d-md-block header_center_text">
            <h2 className="mt-3 ml-1 text-center font-weight-normal d-none d-lg-block">
              Aurbitus Management System
            </h2>
            <h3 className="mt-3 ml-1 text-center font-weight-normal d-none d-md-block d-lg-none">
              Aurbitus Management System
            </h3>
          </div>
         
          <div className="col-6 col-md-2  mt-1 d-flex justify-content-end">
          <CgProfile  className='text-dark mt-3  navbar_icon'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar_Phone;
