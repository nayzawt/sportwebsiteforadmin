import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import './category.scss'
import CategoryTable from './CategoryTable'

const Category = () => {
    const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="category">
        <Sidebar />
        <div className="categoryContainer">
            <CategoryTable />
        </div>
    </div>
    </div>
  )
}

export default Category
