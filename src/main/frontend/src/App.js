import React, { useState, useEffect } from 'react';
import axios from 'axios';

import components from 'components';

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material'
import './App.css'



const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectUpdate, setUpdatePost] = useState(null);
  const [selectDelete, setDeletePost] = useState(null);


  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get('/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  };

  const handleCreatePost = () => {
    axios.post(
      '/api/posts', 
      newPost, 
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    )

      .then(response => {
        console.log('Post created:', response.data);
        fetchPosts();
        setShowAddForm(false);
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });

  };


  const handleUpdatePost = () => {
    axios.put('/api/posts/${selectUpdate.pid}', 
        selectUpdate, {
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
    )
  }


  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const toggleUpdateForm = () => {
    setShowAddForm(!showUpdateForm);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false); 
  }; 

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleUpdateForm=(post) => {
    setUpdatePost(post);
  } //update할 post가 지정됨

  const UpdatePostForm = (post) => {
    return (
      <div id="post-form" className={toggleUpdateForm?"form-open":"form-close"}>

        <h2 style={{ textAlign: 'center' }}>게시글 수정</h2>
        <div className="close-icon" onClick={handleCloseUpdateForm} >X</div>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <input
              type="text"
              value={post.title}
              onChange={e => setUpdatePost({ ...selectUpdate, title: e.target.value })}
            />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <textarea
          value={newPost.content}
          onChange={e => setNewPost({ ...newPost, content: e.target.value })}
        />
        </div>
      </div>
    )
  }
  
  const handleDeleteClick=(post) => {
    setDeletePost(post);
  }

  const PostDetail = ({post}) => {
      return (
        <div>
          <p>{post.title}</p>
          <p>{post.author}</p>
          <p>{post.createdAt}</p>
          <p>{post.updatedAt}</p>
          <p>{post.comments}</p>
          <p>{post.views}</p>
          <p>{post.recommendations}</p>   //TODO : 상세 페이지
        </div>
      );
    };

  const renderPostDetail = (post) => {
    if (selectedPost && (selectedPost.pid === post.pid)) {
      return (
        <PostDetail post={post} />
      );
    } else {
      return (
        <TableRow key={post.pid} onClick={() => handlePostClick(post)}>
          <TableCell>{post.title}</TableCell>
          <TableCell>{post.createdAt}</TableCell>
          <TableCell>{post.recommendations}</TableCell>
          <TableCell>{post.views}</TableCell>
          <TableCell>
            {/* <button onClick={() => handleUpdateForm(post)}>수정</button> */}
            <button onClick={toggleUpdateForm}>수정</button>
            <button onClick={() => handleDeleteClick(post)}>삭제</button>
          </TableCell>
        </TableRow>
      );
    }
  };

  




// 페이지

  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center' }}>게시판</h1>
      </div>

      <div>
        <TableContainer sx={{ maxHeight: '400px' }} component={Paper}>
          <Table stickyHeader aria-label='simple table'>

            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>작성일자</TableCell>
                <TableCell>추천수</TableCell>
                <TableCell>조회수</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {posts.map(post => (
                <TableRow key={post.pid} onClick={() => handlePostClick(post)}>
                  <TableCell>{post.pid}</TableCell>
                  <TableCell>
                    <div className={selectedPost === post.pid ? "selected" : ""}>
                      {renderPostDetail(post)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            
          </Table>
        </TableContainer>
      </div>

      <button onClick={toggleAddForm}>게시글 작성하기</button>
        {showAddForm && <components.addPostForm />};
    </>
  );
}



const App = () => {
  return (
    <div className="App">
      <PostList />
    </div>
  );
}

export default App;