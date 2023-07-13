import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    axios.post('/api/posts', newPost, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
      .then(response => {
        console.log('Post created:', response.data);
        fetchPosts();
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });

      setShowForm(false);
  };

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCloseForm = () => {
    setShowForm(false);
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
                <TableRow key={post.pid}>
                  <TableCell>{post.pid}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.createdAt}</TableCell>
                  <TableCell>{post.recommendations}</TableCell>
                  <TableCell>{post.views}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <button onClick={toggleForm}>게시글 작성하기</button>


// 게시글 작성 폼
      {showForm && (
      <div id="create-post-form" className={showForm ? 'create-post-form-open' : ''}>
        <h2 style={{ textAlign: 'center' }}>새로운 게시글 작.성</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="제목"
            value={newPost.title}
            onChange={e => setNewPost({ ...newPost, title: e.target.value })}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <textarea
            placeholder="내용"
            value={newPost.content}
            onChange={e => setNewPost({ ...newPost, content: e.target.value })}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={handleCreatePost}>게시글 작성</button>
        </div>
      </div>
      )}
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