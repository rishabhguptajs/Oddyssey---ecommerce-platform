import React from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "./UserMenu";

const Profile = () => {
  return (
    <Layout title={"Dashboard - Profile"}>
      <div className="flex flex-row">
        <div className="flex justify-start m-5 hover:shadow-md transition-shadow w-fit border-[#c5cae9] border-4">
          <UserMenu />
        </div>
        <div className="m-5 border-4 p-4 rounded border-[#3f51b5]">
          <h1 className="font_styling">Your Profile</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
