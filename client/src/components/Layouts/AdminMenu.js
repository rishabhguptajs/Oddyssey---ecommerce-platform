import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <div className="flex flex-col h-fit pb-3 rounded-sm gap-4 m-4 justify-center align-top h-40vh">
      <NavLink
        to="/dashboard/admin"
        className="p-4 font_styling rounded-md  transition-shadow  justify-start border-solid border-2 border-[#e13453] hover:shadow-md bg-[#ffe9ea] cursor-pointer w-fit flex text-xl"
      >
        Admin Menu
      </NavLink>
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
        <li>
          <NavLink
            className="p-2 my-2 hover:shadow-md transition-shadow font_styling rounded-md justify-center border-solid border-2 border-[#7e7e7e] bg-[#ffe9ea] flex text-md"
            to="/dashboard/admin/products"
          >
            All Products
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
