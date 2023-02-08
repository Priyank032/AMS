import React from "react";
import { FaUserCircle } from "react-icons/fa";
const Card = () => {
  return (
    <div>
      <div className=" inner_container mt-5 ">
          <FaUserCircle style={{ fontSize: "70px" , position:"relative" , top:"-30px" }} className="text-dark bg-white ml-4  rounded-circle px-1"/>
        <div className="pb-1">
          <h5 className="font-weight-Normal ml-4 "> Add Teacher </h5>
          <p className="font-weight-Normal ml-4 ">UI/UX Designer</p>
        </div>
      </div>
    </div>

  );
};

export default Card;
