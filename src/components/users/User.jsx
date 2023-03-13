import React from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from '../../crud/component/profile/Profile'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import './user.scss'
import UserTable from './UserTable'


const User = () => {
  
  return (
    <div>
      <Navbar />
      <div className="user">
      <Sidebar />
      <div className="userContainer">
          <UserTable />
          
      </div>
    </div>
    </div>
  )
}

export default User