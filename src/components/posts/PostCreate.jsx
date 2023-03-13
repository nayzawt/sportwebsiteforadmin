import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import ReactQuill from 'react-quill'
import { useQuill } from 'react-quilljs';
import 'react-quill/dist/quill.snow.css'
import img from '../../../public/1488.gif'
import { axiosAuth, axiosAuthUpload } from '../../config/axios'

const PostCreate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({
      title: '',
      image: '',
      desc: '',
      category: '', 
    });
    
    const [category, setCategory] = useState([]);

    const loadCategory = async () => {
      const resultCate = await (await axiosAuth().get('http://localhost:5000/v1/categories')).data;
      setCategory(resultCate);
    }

    useEffect(() => {
      loadCategory();
    }, []);

    const descChange = (e) => {
      setPost({...post, desc: e})
    };

    const cateChange = (e) => {
      setPost({...post, category: e.target.value})
    };

    const inputChange = (e) => {
      setPost({...post, [e.target.name]: e.target.value})
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      let formData = new FormData()
      formData.append('title', post.title )
      formData.append('category', post.category )
      formData.append('date', post.date)
      formData.append('desc', post.desc )
      formData.append('file', post.image )
      try {
          const result = await axiosAuthUpload().post('http://localhost:5000/v1/posts', formData, {
            
          });
          console.log(result);
         navigate('/posts')
      } catch (error) {
        console.log(error)
      } 
    }

    const photoURL = (e) => {
        setPost({...post, image: e.target.files[0]})
        console.log(e.target.files[0])
    }

  

  return (
    <div>
    {
      loading ? <div className="loading"><img src={img} alt="" className="loading-img" /></div> :
      <div>
        <div>
          <Navbar />
        </div>
        <div className='profile'>  
        <Sidebar />
        <div className="profileConatiner">
          <div className="profile-inner" > 
            <form onSubmit={e => onSubmit(e)}>
              <div className='profile-inner-second'>
                <div className='imageuploads' >
                    <div className="button-wrap" onChange={photoURL} >
                      <label className="image-button" htmlFor="upload">Upload File</label>
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
                {/* <div className="input-data">
                    <input type="text" name='title' value={post.title} onChange={e => inputChange(e)} />
                    <div className="underline"></div>
                    <label>Title</label>
                </div> */}
              
                
                <div className="quill-textarea">
                  <label>Descraption</label> 
                  <ReactQuill theme='snow'  value={post.desc} onChange={descChange} /> 
                </div>

              </div> 
                <div>             
                    <button type='button'  className='send-but' onClick={() => navigate('/posts')}>Back </button>               
                    <button type='submit' className='update' onClick={onSubmit}  >Add New Post</button>                
                </div>
              </div>
              </form>
              
              
          </div>
        </div>
        
        </div>
      </div>
    }
    </div>
  )
}

export default PostCreate