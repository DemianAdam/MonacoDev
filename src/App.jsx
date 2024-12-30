import { useState } from 'react'
import './App.css'

import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Container className='d-flex flex-column'>
      <Row className='mb-5'>
        <h1>¡Registrate en nuestra Lista!</h1>
      </Row>
      <Row>
        <RegistrationForm />
      </Row>
    </Container>

  )
}

export default App
