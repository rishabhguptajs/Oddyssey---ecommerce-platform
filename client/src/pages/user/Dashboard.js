import React from 'react'
import { NavLink } from 'react-router-dom'
import Layout from '../../components/Layouts/Layout'
import UserMenu from './UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={ `Dashboard - ${auth?.user?.name} | Oddyssey `}>
      <div className="flex flex-row">
        <div className="flex justify-start m-5 hover:shadow-md transition-shadow w-fit border-[#c5cae9] border-4">
          <UserMenu />
        </div>
        <div className="flex flex-col justify-center m-5 hover:shadow-md transition-shadow w-fit h-inherit p-4 border-[#c5cae9] border-4">
          <h1 className="font-bold font_styling p-3 h-fit">Name : {auth?.user?.name}</h1>
          <h1 className="font-bold font_styling p-3 h-fit">Email : {auth?.user?.email}</h1>
          <h1 className="font-bold font_styling p-3 h-fit">Contact : {auth?.user?.phone}</h1>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
