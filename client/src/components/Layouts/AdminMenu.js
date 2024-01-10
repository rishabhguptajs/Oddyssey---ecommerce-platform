import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="p-4 font_styling rounded-md  transition-shadow  justify-start border-solid border-2 border-[#e13453] hover:shadow-md bg-[#ffe9ea] cursor-default w-fit flex text-xl">
        Admin Panel
      </div>
      <ul>
        <li>
          <NavLink
            className="p-2 my-2 hover:shadow-md  transition-shadow  font_styling rounded-md justify-center border-solid border-2 border-[#7e7e7e] bg-[#ffe9ea] flex text-md"
            to="/dashboard/admin/create-product"
          >
            Create Product
          </NavLink>
        </li>
        <li>
          <NavLink
            className="p-2 my-2 hover:shadow-md  transition-shadow  font_styling rounded-md justify-center border-solid border-2 border-[#7e7e7e] bg-[#ffe9ea] flex text-md"
            to="/dashboard/admin/create-category"
          >
            Create Category
          </NavLink>
        </li>
        <li>
          <NavLink
            className="p-2 my-2 hover:shadow-md transition-shadow font_styling rounded-md justify-center border-solid border-2 border-[#7e7e7e] bg-[#ffe9ea] flex text-md"
            to="/dashboard/admin/users"
          >
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
