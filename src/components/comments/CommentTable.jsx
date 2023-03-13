import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosAuth } from '../../config/axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { textTransform } from '@mui/system';
import { API_URL } from '../../config/constant';


const CommentTable = () => {
    const navigate = useNavigate();
    const [comment, setComment] = useState([]);
    const [page, setPage] = useState(1);
    const [querry, setQuerry] = useState('')

    const loadComment = async () => {
      let param = `v1/comments?sortBy=_id:desc&page=${page}&limit=4`

      if(querry) {
        param += `&name=${querry}`
      }
      const resultCom = await (await axiosAuth().get(API_URL + param)).data;
      setPage(resultCom?.page);
      setComment(resultCom);
    };

    const deleteCom = async (id) => {
      alert('You sure this user is comment')
      await axiosAuth().delete( API_URL + `v1/comments/${id}`)
      loadComment();
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
      loadComment();
    }, [page, querry]);

    
  return (
    <table className="main">
        
    <div className='thead'>
      <h4>Comments</h4>
      <tr className='table-header'>
        <th className='user-header-name'><span>COMMENT NAME</span></th>
        <th className="user-header-name">NUMBER OF POSTS</th>
        <th className="user-header-action">ACTION</th>
      </tr>

      <div className="post-thead-inner">
        {
          comment?.results?.map((item, index) => {
            return (
              <tr className='table-inner' key={index} >
                <th className='name' style={{textTransform: 'uppercase'}} ><span>{item.name}</span></th>
                <th className="name">{item.desc}</th>
                <th className="action">
                  <DeleteIcon className="delete" onClick={() => deleteCom(item.id)}/>
                </th>
              </tr>
            )
          })
        }
      </div>
      <button className={1 >= page ? 'square_btnnot' : 'square_btn'} disabled={1 >= page} onClick={() => handlePrev()}>Prev</button>
      <span className='page__span'>{comment.page}/{comment.totalPages}</span>
      <button className={comment?.totalPages <= page ? 'square_btnnot' : 'square_btn'} disabled={comment?.totalPages <= page} onClick={() => handleNext()}>Next</button>
  
    </div>
  </table>
  )
}

export default CommentTable
