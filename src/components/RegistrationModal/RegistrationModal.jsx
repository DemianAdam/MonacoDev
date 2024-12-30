import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./RegistrationModal.css"

import React from 'react'
import { ModalBody } from 'react-bootstrap';

export default function RegistrationModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='my-modal'
    >

      <Modal.Title id="contained-modal-title-vcenter" className='p-2 text-center'>
        Te Registraste!
      </Modal.Title>


      <Modal.Footer className='d-flex justify-content-center'>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}
