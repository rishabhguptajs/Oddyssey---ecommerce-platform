import React from "react";
import Layout from "../../components/Layouts/Layout";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="flex flex-col h-fit pb-3 rounded-sm gap-4 m-4 justify-center align-top">
      <NavLink
        to="/dashboard/user"
        className="p-4 font_styling rounded-md  transition-shadow  justify-start border-solid border-2 border-[#e13453] hover:shadow-md bg-[#ffe9ea] cursor-pointer w-fit flex text-xl"
      >
        User Panel
      </NavLink>
      <ul>
        <li>
          <NavLink
            className="p-2 my-2 hover:shadow-md  transition-shadow  font_styling rounded-md justify-center border-solid border-2 border-[#7e7e7e] bg-[#ffe9ea] flex text-md"
            to="/dashboard/user/profile"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            className="p-2 my-2 hover:shadow-md  transition-shadow  font_styling rounded-md justify-center border-solid border-2 border-[#7e7e7e] bg-[#ffe9ea] flex text-md"
            to="/dashboard/user/orders"
          >
            Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
