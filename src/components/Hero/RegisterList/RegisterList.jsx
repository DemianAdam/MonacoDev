import React from 'react'
import { useState } from 'react'
import RegistrationForm from './RegistrationForm/RegistrationForm';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner'
import RegistrationModal from './RegistrationModal/RegistrationModal'
import MyTable from './RegistrationForm/MyTable/MyTable'
import { useEffect } from 'react';

export default function RegisterList({ setHeader }) {
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  useEffect(() => {
    setHeader("¡Registrate en nuestra Lista!");
  }, [setHeader]);


  const obj = {
    sheetName: null,
    quantity: 2,
    nombre: ["WEA", "Nombre01"],
    apellido: ["Apellido00", "Apellido01"],
    dni: ["123", "456"],
    fecha_de_nacimiento: ["2000-01-01", "2000-02-02"]
  }

  const tableProps = {
    headers: ["#", "Nombre", "Apellido", "DNI", "Fecha de Nacimiento"],
    rows: obj.quantity,
    persons: {
      id: [...obj.dni],
      nombre: [...obj.nombre],
      apellido: [...obj.apellido],
      dni: [...obj.dni],
      fecha_de_nacimiento: [...obj.fecha_de_nacimiento]
    }
  }

  return (
    <>
      {
        !loading ?
          <RegistrationForm onLoading={setLoading} setModalShow={setModalShow} setModalContent={setModalContent} />
          :
          <LoadingSpinner />
      }
      <RegistrationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        content={modalContent}
      />

      <MyTable headers={tableProps.headers} rows={tableProps.rows} obj={tableProps.persons} />
      

    </>
  )
}
