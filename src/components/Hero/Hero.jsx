import React from 'react'
import { useState } from 'react'
import RegistrationForm from './RegistrationForm/RegistrationForm';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner'
import RegistrationModal from './RegistrationModal/RegistrationModal'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { Button } from 'react-bootstrap'

export default function Hero() {
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false)
  return (
    <Container fluid className='d-flex flex-column align-self-center'>
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
        {<Button onClick={() => setModalShow(true)}>asd</Button>}
      </Container>
  )
}
