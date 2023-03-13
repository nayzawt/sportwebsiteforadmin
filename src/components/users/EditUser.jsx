import React from 'react'
import '../register/register.css'
import { useState, useEffect } from 'react';
import { axiosAuthUpload } from '../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../config/constant';
import img from '../../../public/1488.gif'
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';

const UserEdit = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        name: '',
        image: '',
        email: '', 
        password: '',

    });
  
    const inputChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
    };

    const editUser = async (id) => {
    const edit = await (await axiosAuthUpload().get( API_URL + `v1/users/${id}`)).data;
    setUser(edit);
    }

    useEffect(() => {
        editUser(id);
    }, []);

    const {id} = useParams();
    const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData()
    formData.append('name', user.name )
    formData.append('email', user.email )
    formData.append('password', user.password )
    formData.append('file', user.image )
    const result = await axiosAuthUpload().patch(API_URL + `v1/users/${id}`, formData, {});
    console.log(result);
    navigate('/users');
    };
  
    const photoURL = (e) => {
        setUser({...user, image: e.target.files[0]})
        console.log(e.target.files[0])
    }

    
  return (
    <>
   {
    loading? <div className="loading"><img src={img} alt="" className="loading-img" /></div> :

    <div>
      <Navbar />
      <div className="register">
        <Sidebar />
        <div className="registerContainer">
          <div className='main-register'>
          <div className="container">
            <form onSubmit={e => onSubmit(e)} >
                <div className="user-details">
                    
                    <div className='imageuploads' >
                       <div className="button-wrap" onChange={photoURL} >
                          <label className="image-button" htmlFor="upload">Upload File</label>
                          <input id="upload" type="file" />
                        </div> 
                    </div>
                    <div className="input-box">
                      <span className="details">UserName</span>
                      <input type="text" name='name' placeholder="Enter your username" value={user.name} onChange={e => inputChange(e)} />
                    </div>
                    <div className="input-box">
                      <span className="details">Email</span>
                      <input type="text" name='email' placeholder="Enter your email" value={user.email} onChange={e => inputChange(e)} />
                    </div>
                    <div className="input-box">
                      <span className="details">Password</span>
                      <input type="text" name='password' placeholder="Enter your number" value={user.password} onChange={e => inputChange(e)} />
                    </div>
                </div>
                <div className="button">
                    <button type="submit" onClick={onSubmit} >Upload</button>
                </div>
            </form>
            </div>
        </div>
        </div>
      </div>
   </div>
   }
   </>
  )
}

export default UserEdit
