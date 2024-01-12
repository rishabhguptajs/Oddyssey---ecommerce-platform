import React from 'react'
import Layout from '../../components/Layouts/Layout'
import UserMenu from './UserMenu'

const Profile = () => {
  return (
    <Layout>
        <div className='flex justify-start m-5 hover:shadow-md transition-shadow w-fit border-[#c5cae9] border-4'>
            <UserMenu />
        </div>
    </Layout>
  )
}

export default Profile
