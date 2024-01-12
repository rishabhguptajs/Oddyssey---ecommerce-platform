import React from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";

const CreateCategory = () => {
  return (
    <Layout title={" Dashboard - Create Category "}>
      <div className="flex flex-row">
        <div className="flex justify-start m-5 hover:shadow-md transition-shadow w-fit border-[#c5cae9] border-4">
          <AdminMenu />
        </div>
        <div className="flex flex-col justify-center m-5 hover:shadow-md transition-shadow w-fit h-inherit p-4 border-[#c5cae9] border-4">
          <h1 className="font-bold font_styling p-3 h-fit w-full">Create Category</h1>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
