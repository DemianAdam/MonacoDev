import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DniInput from './DniInput/DniInput';
import { Alert } from 'react-bootstrap';
import BirthDateInput from './BirthDateInput/BirthDateInput';
import axios from 'axios';


export default function RegistrationForm({ onLoading, setModalShow }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [isAgeValid, setIsAgeValid] = useState(true);
    const [persons, setPersons] = useState({ quantity: 0, nombre: [], apellido: [], dni: [], fechas_de_nacimiento: [] });
    const obj = {
        sheetName: null,
        quantity: 2,
        nombre: ["WEA", "Nombre01"],
        apellido: ["Apellido00", "Apellido01"],
        dni: ["123", "456"],
        fecha_de_nacimiento: ["2000-01-01", "2000-02-02"]
    }


    const handleAgeValidityChange = (validity) => {
        setIsAgeValid(validity);
        setErrorMessage("");  // Clear error message when age is valid
    };
    const url = "https://script.google.com/macros/s/AKfycbxAtC1j7_z8ipQijXk7b1uNEtxm_RbcTUlSwMMQNA7R_ORPfZI9mh2qWLPVyRyKyUT3/exec"

    const addPerson = (data) => {
        /* setPersons((prev) => [...prev, data]);
         console.log(persons)*/
    }
    const register = async (data) => {
        try {
            onLoading(true)
            const response = await axios.get(url, {
                params: data,
            });
           console.log(response)


            if (response.status === 200) {
                setModalShow(true)
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            onLoading(false);
        }
    }

    const handleSumbit = async (event) => {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        event.preventDefault();
        event.target.reset();
        const clickedButton = event.nativeEvent.submitter.name;
        if (!isAgeValid) {
            setErrorMessage("Debes ser mayor de 18 años para registrarte.");
            return;
        }

        console.log(data)
        switch (clickedButton) {
            case 'register':
                register(data)
                break;
            case 'addPerson':
                addPerson(data);
                break;
        }
    };

    return (
        <>

            <Form onSubmit={handleSumbit}>
                <Form.Group className="mb-3" controlId="input-firstname">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control required minLength={3} maxLength={30} type="text" placeholder="Tu Nombre" name='nombre' />
                </Form.Group>

                <Form.Group className="mb-3" controlId="input-lastname">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control required minLength={3} maxLength={30} type="text" placeholder="Tu Apellido" name='apellido' />
                </Form.Group>

                <DniInput />
                <BirthDateInput onAgeValidityChange={handleAgeValidityChange} />
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <div className='d-flex justify-content-evenly'>
                    <Button variant="primary" type="submit" name='register'>
                        Regitrar
                    </Button>

                    <Button variant="primary" type="submit" name="addPerson">
                        Añadir Persona
                    </Button>
                </div>
                {<Button onClick={() => register(obj)}>asd</Button>}
            </Form>

        </>
    )
}
