import React from 'react'
import RegistrationForm from './RegistrationForm/RegistrationForm';
import MyTable from './RegistrationForm/PersonsTable/PersonsTable'
import { useEffect } from 'react';

export default function RegisterList({ setHeader, setLoading, setModalShow, setModalContent, user, setUser }) {

  useEffect(() => {
    setHeader(<>{`! Hola ${user.name} !`}<p>Hace tu lista de personas</p></>);
  }, [setHeader]);



  return (
    <RegistrationForm
      onLoading={setLoading}
      setModalShow={setModalShow}
      setModalContent={setModalContent}
      user={user}
      setUser={setUser}
    />
  )
}
