import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosAuth } from '../../config/axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { textTransform } from '@mui/system';
import { API_URL } from '../../config/constant';


const CategoryTable = () => {
    const navigate = useNavigate();
    const [cate, setCate] = useState([]);
    const [page, setPage] = useState(1);
    const [querry, setQuerry] = useState('')

    const loadCategory = async () => {
      let param = `v1/categories?sortBy=_id:desc&page=${page}&limit=4`

      if(querry) {
        param += `&name=${querry}`
      }
      const resultCate = await (await axiosAuth().get(API_URL + param)).data;
      setPage(resultCate?.page);
      setCate(resultCate);
    };

    const deleteCate = async (id) => {
      alert('You sure this user is category')
      await axiosAuth().delete( API_URL + `v1/categories/${id}`)
      loadCategory();
    };

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
      loadCategory();
    }, [page, querry]);

    
  return (
    <table className="main">
        
    <div className='thead'>
      <h4>Category</h4>
      <div className="create-but">      
        <input type="text" placeholder='Search...' value={querry} onChange={searchInput} />
        <button  onClick={() => navigate('create-categories')}>Add Category</button>
      </div>
      <tr className='table-header'>
        <th className='user-header-name'><span>CATEGIRY NAME</span></th>
        <th className="user-header-name">NUMBER OF POSTS</th>
        <th className="user-header-action">ACTION</th>
      </tr>

      <div className="post-thead-inner">
        {
          cate?.results?.map((item, index) => {
            return (
              <tr className='table-inner' key={index} >
                <th className='name' style={{textTransform: 'uppercase'}} ><span>{item.name}</span></th>
                <th className="name">{item.numberOfPosts}</th>
                <th className="action">
                  <EditIcon className='edit' onClick={() => navigate(`edit-categories/${item.id}`)} />
                  <DeleteIcon className="delete" onClick={() => deleteCate(item.id)}/>
                </th>
              </tr>
            )
          })
        }
      </div>
      <button className={1 >= page ? 'square_btnnot' : 'square_btn'} disabled={1 >= page} onClick={() => handlePrev()}>Prev</button>
      <span className='page__span'>{cate.page}/{cate.totalPages}</span>
      <button className={cate?.totalPages <= page ? 'square_btnnot' : 'square_btn'} disabled={cate?.totalPages <= page} onClick={() => handleNext()}>Next</button>
  
    </div>
  </table>
  )
}

export default CategoryTable
