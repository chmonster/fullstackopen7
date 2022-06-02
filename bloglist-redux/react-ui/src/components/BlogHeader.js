//import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../reducers/loginReducer'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Container, Menu } from 'semantic-ui-react'
import LoginForm from './LoginForm'
import BlogEntryForm from './BlogEntryForm'
import Togglable from './Togglable'

const BlogHeader = () => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(handleLogout())
  }
  const loggedUser = useSelector(state => state.login)

  const [activeItem, setActive] = useState('blogs')
  const handleItemClick = (name) => setActive(name)

  const username = loggedUser ? loggedUser.username : ''
  const name = loggedUser ? loggedUser.name : ''

  const togglableLoginRef = useRef()
  const togglableBlogRef = useRef()

  const loggedIn = loggedUser ? true : false
  const hideWhenLoggedIn = { display: loggedIn ? 'none' : '' }
  const showWhenLoggedIn = { display: loggedIn ? '' : 'none' }

  /*const padding = {
    padding: 5
  }*/

  return (
    <div className="blogheader"><Container>
      <Menu pointing borderless>
        <Menu.Item as='h1' style={{ textAlign: 'justify', verticalAlign: 'middle' }}>
          Blog-0-Rama
        </Menu.Item>
        <Menu.Item
          as={Link}
          to='/'
          active={activeItem === 'blogs'}
          onClick={() => handleItemClick('blogs')}
        >
          <Icon name='book' />Blogs
        </Menu.Item>
        <Menu.Item
          as={Link}
          to='/users'
          active={activeItem === 'users'}
          name='Users'
          onClick={() => handleItemClick('users')}
        >
          <Icon name='user' />Users
        </Menu.Item>
        <Menu.Item style={{ textAlign: 'justify' }}>
          <div style={showWhenLoggedIn}>
            {username} ({name}) logged in
            <Button onClick={logout}>
              <Icon name='log out' />Log out
            </Button>
          </div>
          <div style={hideWhenLoggedIn}>
            <Togglable buttonLabel="log in" buttonIcon='sign in' ref={togglableLoginRef}>
              <LoginForm ref={togglableLoginRef} />
            </Togglable>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div style={showWhenLoggedIn}>
            <Togglable buttonLabel="new blog" buttonIcon='add' ref={togglableBlogRef}>
              <BlogEntryForm ref={togglableBlogRef} />
            </Togglable>
          </div>
          <div style={hideWhenLoggedIn}>
            Log in to add blog content
          </div>
        </Menu.Item>
      </Menu>
    </Container></div>
  )
}

export default BlogHeader
