import React from 'react'
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './comment.scss'
import CommentTable from './CommentTable';

const Comment = () => {
  return (
    <div>
      <Navbar />
      <div className="comment">
        <Sidebar />
        <div className="commentContainer">
            <CommentTable />
        </div>
      </div>
    </div>
  )
}

export default Comment;
