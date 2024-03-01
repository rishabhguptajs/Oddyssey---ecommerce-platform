import React from "react";
import Layout from "../../components/Layouts/Layout";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="flex flex-col h-fit pb-3 rounded-sm gap-4 m-4 justify-center items-start">
  <NavLink
    to="/dashboard/user"
    className="px-4 py-2 font_styling rounded-md transition-shadow border-2 border-[#e13453] hover:shadow-md bg-[#ffe9ea] text-xl"
  >
    User Panel
  </NavLink>
  <ul className="list-none">
    <li>
      <NavLink
        className="px-4 py-2 my-2 font_styling rounded-md transition-shadow border-2 border-[#7e7e7e] hover:shadow-md bg-[#ffe9ea] text-md"
        to="/dashboard/user/profile"
      >
        Profile
      </NavLink>
    </li>
  </ul>
</div>

  );
};

export default UserMenu;
