import React from "react"
import { NavLink } from "react-router-dom"
import Layout from "../../components/Layouts/Layout"
import UserMenu from "./UserMenu"
import { useAuth } from "../../context/auth"

const Dashboard = () => {
  const [auth, setAuth] = useAuth()
  return (
    <Layout title={`Dashboard - ${auth?.user?.name} | Oddyssey `}>
      <div className="flex flex-col">
        <div className="flex justify-start m-5 hover:shadow-md transition-shadow border-[#c5cae9] border-4 rounded-md">
          <UserMenu />
        </div>
        <div className="flex flex-col justify-center m-5 hover:shadow-md transition-shadow border-[#c5cae9] border-4 rounded-md p-3">
          <h1 className="font-bold font_styling mb-3">
            Name: {auth?.user?.name}
          </h1>
          <h1 className="font-bold font_styling mb-3">
            Email: {auth?.user?.email}
          </h1>
          <h1 className="font-bold font_styling mb-3">
            Contact: {auth?.user?.phone}
          </h1>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
