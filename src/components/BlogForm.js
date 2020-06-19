import React, { useState, useEffect } from 'react'

const BlogForm = ({addingfunction}) => {
    const [url,setUrl] = useState('') //moved here they save focus while printing, unlike, when located at app
    const [author,setAuthor] = useState('')
    const [title,setTitle] = useState('')


const defaultb = (event) => {event.preventDefault();setUrl('')
        setAuthor('')
        setTitle('')}
    


    return (



      <div>


        <form onSubmit={defaultb}>

          <input className="authorContent" type="text" value={author} name="author" placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}/>
          <br/>
          <input className="urlContent" type="text" value={url} name="url" placeholder="url"
            onChange={({ target }) => setUrl(target.value)}/>
          <br/>

          <input className="titleContent" type="text" value={title} name="title" placeholder="title"
            onChange={({ target }) => setTitle(target.value)}/>
          <button className="submit"  onClick={addingfunction({url:url,author:author,title:title})}> submit</button>

        </form>

      </div>


    )}


    export default BlogForm
