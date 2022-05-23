//import { useState, useEffect } from 'react'
//import axios from 'axios'
import { useResource, useField } from './hooks'
import { Button, Input, Page, Footer } from './styles'

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <Page>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <Input {...content} />
        <Button>create</Button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <Input {...name} /> <br/>
        number <Input {...number} />
        <Button>create</Button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
      <Footer>duh</Footer>
    </Page>

  )
}

export default App