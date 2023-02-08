import React, { useState } from "react";
import AccountMenu from "./AccountMenu";
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import Dropdown from "../component/Dropdown"
import Search_bar_youtube_phn from "./Search_bar_youtube_phn";

const MenuBars = styled(FaBars)`
    display:none;

    @media screen and (max-width:768px) {
        display:block;
        color:#000;
        height:40px;
        width:40px;
        cursor:pointer;
        position :absolute;
        top: 0;
        right: 0;
        transform : translate(-50%,25%);
    }
`;
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <div className="container-fluid headar">
        <div className="row">
          <div className="col-6 col-md-2">
            <h1 className="mt-3 ml-1">AMH</h1>
          </div>
          <div className="col-md-8 d-none d-md-block ">
            <h2 className="mt-3 ml-1 text-center font-weight-normal d-none d-lg-block">
              Aurbitus Management System
            </h2>
            <h4 className="mt-3 ml-1 text-center font-weight-normal d-none d-md-block d-lg-none">
              Aurbitus Management System
            </h4>
          </div>
          {/* <div className="col-md-3 pl-2 mt-1  d-none">
            <Search_bar_youtube_phn />
          </div> */}
          <div className="col-6 col-md-2 mt-1  d-flex justify-content-end">
            <div>
              <AccountMenu />
            </div>
            <div className="d-block d-md-none ml-5">
              <MenuBars onClick={toggle} />
            </div>
            {/* <h1>jiji</h1> */}
          </div>
        </div>
      </div>
      {/* <div className="d-block d-md-none"> */}
      {/* <h1>hello</h1> */}
      <Dropdown isOpen={isOpen} toggle={toggle} />
      {/* </div> */}
    </>
  );
};

export default Navbar;
