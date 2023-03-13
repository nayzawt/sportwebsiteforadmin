import React from 'react'

import Sidebar from '../../../components/sidebar/Sidebar'
import './profile.scss'

import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'

function Profile() {

  const navigate = useNavigate();


  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='profile'>
      
      <Sidebar />
      <div className="profileConatiner">

      </div>
      
  </div>
    </div>
  )
}

export default Profile
