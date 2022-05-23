import { useResource, useField } from './hooks'
import { Button, Input, Container, Form, Table, Header } from 'semantic-ui-react'

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
      <Header as='h2'>Notes</Header>
      <Form onSubmit={handleNoteSubmit}>
        <Input {...content} />
        <Button>create</Button>
      </Form>

      <Table><Table.Body>
        {notes.map(n => <Table.Row key={n.id}><Table.Cell>{n.content}</Table.Cell></Table.Row>)}
      </Table.Body></Table>

      <Header as='h2'>Persons</Header>
      <Form onSubmit={handlePersonSubmit}>
        name <Input {...name} placeholder='name' /> <br/>
        number <Input {...number} placeholder='number' />
        <Button>create</Button>
      </Form>
      <Table><Table.Body>
        {persons.map(n => 
          <Table.Row key={n.id}>
            <Table.Cell>{n.name}</Table.Cell>
            <Table.Cell>{n.number}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body></Table>
    </Container>
  )
}

export default App