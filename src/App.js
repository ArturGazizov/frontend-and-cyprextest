import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

import PropTypes from 'prop-types'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)




  const [loginVisible, setLoginVisible] = useState(false)
  const [blogformVisible, setBlogformVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>{
      let blogstosort=[... blogs]
        blogstosort.sort(comparelikes)
        console.log(blogstosort)
        setBlogs( blogstosort )
        } 
    )
  }, [])


 useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    } 
},
  [])


 const messaging =(messag) => {

    setErrorMessage(messag)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setUsername('')
    setPassword('')

    setBlogs( [] )
    messaging('Logged out')
  }

  



  function comparelikes(a, b) {
    if (a.likes > b.likes ) {
      return -1
    }
    if (a.likes < b.likes) {
      return 1
    }
  // a must be equal to b
    return 0;
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username:username, password:password,
      })
      window.localStorage.setItem(        'loggedNoteappUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
setBlogformVisible(false)

      blogService.setToken(user.token)

      messaging('Successfully logged')

      blogService.getAll().then(blogs =>
      {
        let blogstosort=[...blogs]
        blogstosort.sort(comparelikes)
        setBlogs( blogstosort )
      }
      )


    } catch (exception) {

      messaging('Wrong credentials')
    
    }
  }



const addingablog= (theobject)=>{ return async ()=>{//removed 1 async and now it works
let res=await blogService.create(theobject)
        await messaging(res.title+' was successfully added')

        let blogs = await blogService.getAll()

       let blogstosort=[...blogs]
          blogstosort.sort(comparelikes)
          setBlogs( blogstosort )
        }
    
}




  


  const loginForm = () =>




  {


    return(
      <div>



        <h2>Log in to application</h2>

        <div>

          <form className='theform' onSubmit={handleLogin}>        <div>          username            <input            type="text"            value={username}            name="Username"            onChange={({ target }) => setUsername(target.value)}          />        </div>        <div>          password            <input            type="password"            value={password}            name="Password"            onChange={({ target }) => setPassword(target.value)}          />        </div>        <button type="submit">login</button>      </form>


        </div>
      </div>)
  }



  const afunction= (anobject) => { return () => {
    anobject.likes+=1
    //delete anobject.id
    delete anobject.user
    /**/
    blogService.update(anobject.id,anobject).then((res) => {

    })
  }
  }


  const afunction2= (anobject) => { return () => {


    blogService.remove(anobject).then((res) => {



      let filteredblogs=blogs.filter((it) => (it.id!==anobject.id))
      setBlogs( filteredblogs )

    }).catch((error) => {console.log(error.response.data);messaging(error.message+error.response.data.error)})
  }
  }


  const SecondPage = (n,handleLogout) =>

  {

    const hideWhenVisible2 = { display: blogformVisible ? 'none' : '' }
    const showWhenVisible2 = { display: blogformVisible ? '' : 'none' }

    return (<div>

      {n} logged in <button className='logout' onClick={handleLogout} value="log out">log out</button>
      <h2>blogs</h2>
      <button style={showWhenVisible2} onClick={() => setBlogformVisible(false)}>cancel</button>
      <div style={hideWhenVisible2}>
        <button className='newblog' onClick={() => setBlogformVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible2}>
        <BlogForm addingfunction={addingablog} />
      </div>



      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} functions={afunction(blog)} functions2={afunction2(blog)}/>

      )}

    </div>)}



  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    functions: PropTypes.func.isRequired,
    functions2: PropTypes.func.isRequired,
  }





  return(<div><Notification message={errorMessage}/>

    {/*user === null && loginForm()*/}
    {/*user !== null && SecondPage(user.name,handleLogout)*/}

{user === null       ? loginForm()
      : SecondPage(user.name,handleLogout)      }



  </div>)


}

export default App