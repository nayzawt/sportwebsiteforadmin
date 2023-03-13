import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { axiosAuth } from '../../config/axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_URL } from '../../config/constant';

const UserTable = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [page, setPage] = useState(1);
    const [querry, setQuerry] = useState('');

    console.log(user);

    const loadUsers = async () => {
      let param = `v1/users?sortBy=_id:desc&page=${page}&limit=4`

      if(querry) {
        param += `&name=${querry}`
      }
      const resultUser = await (await axiosAuth().get( API_URL + param)).data;
      setPage(resultUser?.page)
      setUser(resultUser);
    }

    const handleNext = () => {
      setPage(page + 1)
    }
  
    const handlePrev = () => {
      setPage(page - 1)
    }

    const searchInput =  (e) => {
      setPage(1)
      setQuerry(e.target.value)
    }

    useEffect(() => {
      loadUsers();
    }, [page, querry]);
   
    const deleteUser = async (id) => {
      alert('You sure this user is delete')
      await axiosAuth().delete( API_URL +`v1/users/${id}`)
      loadUsers();
    } 

    useEffect(() => {
      loadUsers()      
    }, [page, querry]);

  return (
    <table className="main">
            <div className='thead'>
            <h4>Users</h4>
              <div className="create-but">               
                <input type="text" placeholder='Search...' value={querry} onChange={searchInput} />
                <button  onClick={() => navigate('register')}>Add User</button>
              </div>
              <tr className='table-header'>
                <th className='user-header-image' >IMAGE</th>     
                <th className='user-header-name'><span>NAME</span></th>
                <th className='user-header-email'>EMAIL</th> 
                <th className='user-header-name'><span>NUMBER OF POSTS</span></th>    
                <th className='user-header-action'>ACTION</th>          
              </tr>
              <div className="post-thead-inner">
                {
                user?.results?.map((item, index) => {
                  return(
                    <tr className='table-inner' key={index}>
                      <th className='user-img'>
                        <div className="user-inner-img">
                        <img src={API_URL + item.image} alt="" />
                        </div>
                      </th>
                      <th className="name"><span>{item.name}</span></th>
                      <th className='email'>{item.email}</th>
                      <th className="name"><span>{item.numberOfPosts}</span></th>
                      
                      <th className="action">
                          <EditIcon className='edit' onClick={() => navigate(`edit-users/${item.id}`)} />
                          <DeleteIcon className="delete" onClick={() => deleteUser(item.id)}/>
                      </th> 
                      
                    </tr>
                  )
                })
              }
              </div>
              <button className={1 >= page ? 'square_btnnot' : 'square_btn'} disabled={1 >= page} onClick={() => handlePrev()}>Prev</button>
              <span className='page__span'>{user.page}/{user.totalPages}</span>
              <button className={user?.totalPages <= page ? 'square_btnnot' : 'square_btn'} disabled={user?.totalPages <= page} onClick={() => handleNext()}>Next</button>
          
              
            </div>
          </table>
  )
}

export default UserTable
