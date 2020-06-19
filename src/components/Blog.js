import React, { useState, useEffect } from 'react'
const Blog = ({ blog,functions,functions2 }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const [theblog, setTheblog] = useState(blog)


  const likeonce=() => {
    let newversion={ ...theblog }
    newversion.likes+=1
    setTheblog(newversion);functions()
  }

  useEffect(() => {
    setTheblog(blog)
  },
  [])

  return (
  <div  className='blog' style={{ 'border-style': 'solid','width':200 }}>

  <div className='blog'>
title:{blog.title}<br/> author:{blog.author}<br/>
</div>
      <div style={showWhenVisible}>
        <button className="hide" onClick={() => setBlogVisible(false)}>hide</button><br/>
    <span>likes:</span><span className="amountoflikes">{blog.likes}</span>&nbsp;
        <button className="alike" onClick={likeonce}
        >Like</button><br/><span>url:</span>{blog.url}

        <button className="delete" onClick={functions2}> delete</button>

      </div>
      <button className="showblog" style={hideWhenVisible} onClick={() => setBlogVisible(true)}>Show</button>
    </div>
  )}

export default Blog
