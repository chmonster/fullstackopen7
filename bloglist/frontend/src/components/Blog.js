import { useState } from 'react'

const Blog = ({ blog, user, incLike, deleteBlog }) => {

  const [expand, setExpand] = useState(false)

  const toggleExpand = () => {
    setExpand(!expand)
  }

  const buttonText = expand ? 'hide' : 'view'

  //console.log(userID, blog.user.id.toString())

  return (
    <div className='blog'><table><tbody>
      <tr>
        <td><a href={blog.url} title={blog.title} alt={blog.title}>
          {blog.title}
        </a></td>
        <td style={{ textAlign:'right' }}>
          {blog.author}
          <button className={buttonText} onClick={toggleExpand}>
            {buttonText}
          </button>
          {user && user.username === blog.user.username &&
            <button className='delete' onClick={() => deleteBlog(blog)}>delete</button>
          }
        </td>
      </tr>
    </tbody></table>
    <table><tbody>
      {expand &&
        <tr>
          <td>URL: {blog.url}</td>
          <td>Posted by: {blog.user.name}</td>
          <td style={{ textAlign:'right' }}>
            Likes: {blog.likes}
            <button className='like' onClick={() => incLike(blog)}>like</button>
          </td>
        </tr>
      }
    </tbody></table></div>
  )
}

export default Blog