import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./RegistrationModal.css"

import React from 'react'
import { CloseButton, ModalBody, Row } from 'react-bootstrap';

export default function RegistrationModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='my-modal'
    >
      <Modal.Header className='justify-content-center align-items-center position-relative' >
        <Modal.Title id="contained-modal-title-vcenter" className='p-2 text-center flex-grow-1' >
          ¡Gracias por Registrarte!
        </Modal.Title>
        <CloseButton className='align-self-start m-0 position-absolute top-0 end-0' onClick={props.onHide} />
      </Modal.Header>


      <Modal.Body className='text-center modal-header'>
        <span>Te esperamos en <b>MÓNACO</b> de 1:30 am a 3:30 am</span>
      </Modal.Body>
      <Modal.Body className='text-center '>
        <span>Te esperamos en <b>MÓNACO</b> de 1:30 am a 3:30 am</span>
      </Modal.Body>

      <Modal.Footer className='d-flex justify-content-center'>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}
