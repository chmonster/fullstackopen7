//import { useState, useEffect } from 'react'
//import axios from 'axios'
import { useResource, useField } from './hooks'
import { Table, Form, Button } from 'react-bootstrap'

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
    <div className='container'>
      <h2>Notes</h2>

      <Form onSubmit={handleNoteSubmit}>
        <Form.Group>
          <Form.Label>New note</Form.Label>
          <Form.Control {...content} />
          <Button variant='primary' type='submit'>create</Button>
        </Form.Group>
      </Form>

      <Table striped bordered hover><tbody>
        {notes.map(n => <tr key={n.id}>{n.content}</tr>)}
      </tbody></Table>

      <h2>Persons</h2>
      <Form onSubmit={handlePersonSubmit}>
        <Form.Group>
          <Form.Label>New phone listing</Form.Label>
          <Form.Control {...name} placeholder='name' />
          <Form.Control {...number} placeholder='number' />
          <Button variant='primary' type='submit'>create</Button>
        </Form.Group>
      </Form>

      <Table striped><tbody>
        {persons.map(n => <tr key={n.id}><td>{n.name}</td><td>{n.number}</td></tr>)}
      </tbody></Table>
    </div>
  )
}

export default App