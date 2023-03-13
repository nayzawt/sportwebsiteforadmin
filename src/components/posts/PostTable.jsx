import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { axiosAuth, axiosAuthUpload } from '../../config/axios';
import { API_URL } from '../../config/constant';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { format } from 'timeago.js';

const PostTable = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const [querry, setQuerry] = useState('')
     
    const getPosts = async () => {
      let param = `v1/posts?sortBy=_id:desc&page=${page}&limit=4`

      if(querry) {
        param += `&title=${querry}`
      }
      const resultPost = await ( await axiosAuth().get(API_URL + param)).data
      setPage(resultPost?.page)
      setPost(resultPost);
    }
  
    console.log(post)
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
      getPosts();
    }, [page, querry]);

    const {id} = useParams();
    
    const deletePost = async (id) => {
      alert('You sure this user is post')
      await axiosAuth().delete(API_URL + `v1/posts/${id}`) 
      getPosts();
    }

  return (
      <div className="main">
        <div className='thead'>
        <h4>Posts</h4>
        <div className="create-but">               
          <input type="text" placeholder='Search...' value={querry} onChange={searchInput} />
          <button  onClick={() => navigate('create-posts')}>Add Post</button>
        </div>
        <tr className='table-header'>
          <th className='post-name'><span>TITLE</span></th>
          <th className='port-img'>IMAGE</th>
          <th className='post-category'>CATEGORY NAME</th>
          <th className='post-date'>DATE </th>
          <th className="post-action">ACTION</th>
        </tr>

        <div className="post-thead-inner">
        {
          post?.results?.map((item, index) => {
            return(

              <tr className='table-inner' key={index}> 
                    <th className='post-name post-title'>{item.title}</th>
                    <th className='port-img'>
                      <div className="inner-img">
                        <img src={API_URL + item.image} alt="" />
                      </div>
                    </th>
                    <th className='post-category post-title'>{item.category.name}</th>
                    <th className='post-date post-title'>{format(item.createdAt)}</th>
                    
                    <th className="post-action">
                      <EditIcon className='edit' onClick={() => navigate(`edit-posts/${item.id}`)} />
                      <DeleteIcon className="delete" onClick={() => deletePost(item.id)} />
                    </th> 
              </tr>

            )
          })
        }
        </div>
        {
          post?.results?.length === 0 ? <div> Post Not Found </div> : null
        }
        <button 
          className={1 >= page ? 'square_btnnot' : 'square_btn'}
          disabled={1 >= page} onClick={() => handlePrev()}
        >
          <ArrowBackIosNewIcon />
        </button>
        <span className='page__span'>{post.page}/{post.totalPages}</span>
        <button 
          className={post?.totalPages <= page ? 'square_btnnot' : 'square_btn'} 
          disabled={post?.totalPages <= page} onClick={() => handleNext()}
        >
          <ArrowForwardIosIcon />
        </button>
    
      </div>
      </div>
  )
 }
export default PostTable;
