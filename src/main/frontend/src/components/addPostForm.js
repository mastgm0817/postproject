<div id="post-form" className={showForm ? 'form-open' : 'form-close'}>

    <h2 style={{ textAlign: 'center' }}>새로운 게시글 작성</h2>
        <div className="close-icon" onClick={handleCloseAddForm} >X</div>

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