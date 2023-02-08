import React from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import SideBarFinal from "./SideBarFinal";

const Sidebar_s = (props) =>{

    var sidebarClass = props.isOpen ? "sidebar open" : "sidebar";
    return (
      <div  className={sidebarClass} >
        <button onClick={props.toggleSidebar} className="sidebar-toggle d-none d-md-block"><AiOutlineUnorderedList />
        </button>
        <SideBarFinal />
      </div>
    );
  }


export default Sidebar_s;
