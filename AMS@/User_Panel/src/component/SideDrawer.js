import React, { useState } from "react";
import Content from "./Content";
import Sidebar_s from "./Sidebar_s";

const SideDrawer = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleViewSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div className="Main_sidebar_page_margin mt-1">
      <Sidebar_s 
        isOpen={sidebarOpen}
        toggleSidebar={handleViewSidebar}
      />

      <Content isOpen={sidebarOpen} />
    </div>
  );
}


export default SideDrawer;
