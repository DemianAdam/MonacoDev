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
    const [dniValue, setDniValue] = useState('');
    const [requiredInputs, setRequiredInputs] = useState(true);
    const [persons, setPersons] = useState({ quantity: 0, nombre: [], apellido: [], dni: [], fecha_de_nacimiento: [] });
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
        setPersons((prevState) => ({
            ...prevState,
            quantity: prevState.quantity + 1,
            nombre: [...prevState.nombre, data.nombre],
            apellido: [...prevState.apellido, data.apellido],
            dni: [...prevState.dni, data.dni],
            fecha_de_nacimiento: [...prevState.fecha_de_nacimiento, data.fecha_de_nacimiento],

        }))
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
                resetPersonsState();
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            onLoading(false);
        }
    }

    const resetPersonsState = () => {
        setPersons({ quantity: 0, nombre: [], apellido: [], dni: [], fecha_de_nacimiento: [] })
    }

    const handleSumbit = async (event) => {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        event.preventDefault();
        event.target.reset();
        const clickedButton = event.nativeEvent.submitter.name;
        setDniValue('');

        console.log(data)
        switch (clickedButton) {
            case 'registerOne':
                const singlePerson = {
                    quantity: 1,
                    nombre: [data.nombre],
                    apellido: [data.apellido],
                    dni: [data.dni],
                    fecha_de_nacimiento: [data.fecha_de_nacimiento],
                };
                register(singlePerson)
                break;
            case 'addPerson':
                if (!isAgeValid) {
                    setErrorMessage("Debe ser mayor de 18 años para registrar.");
                    return;
                }
                addPerson(data);
                break;
            case 'registerAll':
                register(persons)
                break;
        }
    };

    return (
        <>

            <Form onSubmit={handleSumbit}>
                <Form.Group className="mb-3" controlId="input-firstname">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control required={requiredInputs} minLength={3} maxLength={30} type="text" placeholder="Tu Nombre" name='nombre' onInput={(e) => e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="input-lastname">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control required={requiredInputs} minLength={3} maxLength={30} type="text" placeholder="Tu Apellido" name='apellido' onInput={(e) => e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '')}/>
                </Form.Group>

                <DniInput value={dniValue} setValue={setDniValue} required={requiredInputs} />
                <BirthDateInput onAgeValidityChange={handleAgeValidityChange} required={requiredInputs} />
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <div className='d-flex justify-content-evenly'>
                    <Button variant="primary" type="submit" name='registerOne' onClick={() => setRequiredInputs(true)}>
                        Regitrar uno
                    </Button>
                </div>
                <div className='d-flex justify-content-evenly pt-2'>
                    <Button variant="primary" type="submit" name="addPerson">
                        Añadir Persona
                    </Button>
                    <Button variant="primary" type="submit" name="registerAll" onClick={() => setRequiredInputs(persons.quantity == 0)}>
                        Registrar Todas
                    </Button>
                </div>
            </Form>

        </>
    )
}
