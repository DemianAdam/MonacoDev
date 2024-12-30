import { useState } from 'react'
import './App.css'

import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import RegistrationModal from './components/RegistrationModal/RegistrationModal';
import { Button } from 'react-bootstrap';
function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false)

  return (
    <Container className='d-flex flex-column'>
      <Row className='mb-5'>
        <h1>¡Registrate en nuestra Lista!</h1>
      </Row>
      <Row className='d-flex justify-content-center'>
        {
          loading ? <LoadingSpinner /> :
            <RegistrationForm onLoading={setLoading} setModalShow={setModalShow} />
        }
        <RegistrationModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Row>
      {/*<Button onClick={()=>setModalShow(true)}>asd</Button>*/}
    </Container>

  )
}

export default App
