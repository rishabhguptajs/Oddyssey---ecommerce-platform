import React from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";

const AdminDashboard = () => {
  return (
    <Layout>
      <div>
        <div className="flex justify-start m-5 hover:shadow-md transition-shadow w-fit border-[#c5cae9] border-4">
          <AdminMenu />
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
