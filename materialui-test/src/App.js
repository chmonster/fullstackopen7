import { Container, TableContainer, TableBody, TableRow, TableCell,
         Paper, Button, TextField, Typography } from '@mui/material'
import { useResource, useField } from './hooks'

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
    <Container>
      <Typography variant='h2'>Notes</Typography>
      <form onSubmit={handleNoteSubmit}>
        <TextField {...content} />
        <Button variant="contained" color="primary" type="submit">create</Button>
      </form>
      
      <TableContainer component={Paper}><TableBody>
      {notes.map(n => <TableRow key={n.id}><TableCell>{n.content}</TableCell></TableRow>)}
      </TableBody></TableContainer>

      <Typography variant='h2'>Persons</Typography>
      <form onSubmit={handlePersonSubmit}>
        <TextField {...name} placeholder='name' />
        <TextField {...number} placeholder='number' />
        <Button variant="contained" color="primary" type="submit">create</Button>
      </form>
      <TableContainer component={Paper}><TableBody>
      {persons.map(n => 
        <TableRow key={n.id}>
          <TableCell>{n.name}</TableCell>
          <TableCell>{n.number}</TableCell>
        </TableRow>
      )}
      </TableBody></TableContainer>
    </Container>
  )
}

export default App