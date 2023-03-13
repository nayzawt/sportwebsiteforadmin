import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../posts/post.scss'
import { axiosAuth, axiosAuthUpload } from '../../config/axios'
import { API_URL } from '../../config/constant'


const PostEdit = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const [count, setCount] = useState(0);
    const [post, setPost] = useState({
      title: '',
      image: '',
      category: '',
      desc: ''
    });

    const {id} = useParams();

    const inputChange = (e) => {
      setPost({...post, [e.target.name]: e.target.value});
    };

    const editPost = async (id) => {
      const edit = await (await axiosAuthUpload().get(API_URL + `v1/posts/${id}`)).data;
      setPost(edit);
    }
    console.log(post)
    
    const loadCategory = async () => {
      const resultCate = await (await axiosAuth().get(API_URL + `v1/categories`)).data;
      setCategory(resultCate);
    }

    const cateChange = (e) => {
        setPost({...post, category: e.target.value})
    };

    const descChange = (e) => {
      setPost({...post, desc: e})
    };
   
    useEffect(() => {
        editPost(id);
        loadCategory();
    }, []);

    const onSubmit = async (e) => {
      e.preventDefault();
      let formData = new FormData()
      formData.append('title', post.title )
      formData.append('category', post.category )
      formData.append('desc', post.desc )
      formData.append('date', post.date)
      formData.append('file', post.image )
      const result = await axiosAuthUpload().patch( API_URL + `v1/posts/${id}`, formData, {
        
      }); 
      console.log(result);  
      navigate('/posts')
    };

    function incrementCount() {
      setCount(count + 1);
    }

    const photoURL = (e) => {
      setPost({...post, image: e.target.files[0]})
      
    }

    console.log(post.category)


  return (
    <div>
    <div>
      <Navbar />
    </div>
    <div className='profile'>
    
    <Sidebar />
    <div className="profileConatiner">
      <div className="profile-inner" > 
        <form onSubmit={e => onSubmit(e)} > 
          <div className='profile-inner-second'>
            <div className='imageuploads' >
                <div className="button-wrap" onChange={photoURL} onClick={incrementCount}   >
                  <label className="image-button" htmlFor="upload" >Upload File</label>
                  <input id="upload" type="file" />
                </div>
                
            </div>
            <div >
              <div className="col-25">
                <label>Post Title</label>
              </div>
              <div className="col-75">
                <input type="text" name='title' value={post.title} onChange={e => inputChange(e)} placeholder="Title" />
              </div>
            </div>
            <div >
              <div className="col-25">
                <label>Category</label>
              </div>
              <div className="col-75">
              <select value={post.category} onChange={cateChange} >
                  <option value="">Select Category</option>
                  {
                    category?.results?.map((cate, index) => {
                      return(
                        <option  key={index} value={cate.id} >{cate.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>

            <div className="profile-second">            
            <div className="quill-textarea">
              <label>Descraption</label>
              <ReactQuill theme='snow'  value={post.desc} onChange={descChange} />
            </div>

          </div> 
            <div>             
                <button type='button'  className='send-but' onClick={() => navigate('/posts')}>Back </button>               
                {
                  count === 0 ? <span className='count-span' >Your Image Field is required</span> : <button type='submit' className='update' onClick={onSubmit}  >Update</button> 
                }               
            </div>
          </div>
        </form>
          
          
      </div>     
    </div>
    
</div>
  </div>
  )
}

export default PostEdit