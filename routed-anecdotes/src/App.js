import { useState } from 'react'
import { useField } from './hooks'

import {
  BrowserRouter as Router,
  Routes, Route, Link, 
  useParams, useNavigate
} from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id}>
          <Link to={`/${anecdote.id}`}> {anecdote.content} </Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))
  if(anecdote) return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>from {anecdote.author}</div>
      <div>{anecdote.votes} votes</div>
      <div>for more info: <a href={anecdote.info}>{anecdote.info}</a></div> 
    </div>      
  )
}
const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    <br />
    Anecdote app for <a href='https://fullstackopen.com/en/'>Full Stack Open</a>.

    See <br />
    <a href='https://github.com/chmonster/fullstackopen7/blob/master/routed-anecdotes/src/App.js'>
      https://github.com/chmonster/fullstackopen7/blob/master/routed-anecdotes/src/App.js
    </a> 
    <br />for the source code.
  </div>
)

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(props.notification) {
    return (
      <div style={style}>
        {props.notification}
      </div>
    )
  } else {
    return <></>
  }
}

const CreateNew = (props) => {

  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info } = useField('text')
  
  //console.log('createnew', resetContent, content)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    //console.log(props)
    navigate('/')
  }

  const resetAll = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  //console.log(...content.delete('reset'))

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input { ...content } />
        </div>
        <div>
          author
          <input { ...author } />
        </div>
        <div>
          url for more info
          <input { ...info } />
        </div>
        <button>create</button>
        <button onClick={resetAll}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const [timeoutID, setTimeoutID] = useState('')


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    doNotification(`'${anecdote.content}' added`)
  }

  const doNotification = (notification) => {
    setNotification(notification)
    if(timeoutID){
      clearTimeout(timeoutID)
    }
    setTimeoutID(setTimeout(() => {
      setNotification('')
    }, 5*1000))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    doNotification(`'You voted for '${anecdote.content}`)
  }

  return (
    <div>
      <Notification notification={notification}/>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
          <Route path="/:id" element={<Anecdote anecdotes={anecdotes} />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App
