import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef ((props, ref) => {
  Togglable.displayName = 'Togglable'

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  return (
    <div className='togglable'>
      <div style={hideWhenVisible}>
        <button
          onClick={toggleVisibility}
          style={buttonStyle}
          className='toggle'
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <button onClick={toggleVisibility}
          className='cancel'
          style={buttonStyle}
        >
            cancel
        </button>
      </div>
    </div>
  )
})

export default Togglable