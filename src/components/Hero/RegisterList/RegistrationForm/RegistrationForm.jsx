import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DniInput from './DniInput/DniInput';
import { Alert } from 'react-bootstrap';
import BirthDateInput from './BirthDateInput/BirthDateInput';
import axios from 'axios';


export default function RegistrationForm({ onLoading, setModalShow, setModalContent, user, setUser }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [isAgeValid, setIsAgeValid] = useState(true);
    const [dniValue, setDniValue] = useState('');
    const [requiredInputs, setRequiredInputs] = useState(true);
    const [persons, setPersons] = useState([]);


    const handleAgeValidityChange = (validity) => {
        setIsAgeValid(validity);
        setErrorMessage("");  // Clear error message when age is valid
    };
    const url = "https://script.google.com/macros/s/AKfycbxke3-BJloTrtP6wmLBzSyV44E-BQGIffHM_IWEds067-g5wxKGaPUjmSszVBE0mfDr/exec"

    const addPerson = (data) => {
        setPersons((prevPersons) => [...prevPersons, newPerson]);
    }
    const register = (data) => {
        onLoading(true)
        const obj = {
            method: "POST",
            endpoint: "addPersons",
            persons: data,
            user
        }
        const json = JSON.stringify(obj);
        axios.post(url, json).then((response) => {
            const data = response.data;
            if (data.result === "success") {

                setModalContent({
                    title: "!Gracias por Registrarte¡",
                    body: <span>Te esperamos en Mónaco de 1:30 am a 3:30 am</span>
                })
                setModalShow(true)
                resetPersonsState();
            }
            else {
                setModalContent({
                    title: "Ups! hubo un error al registrar",
                    body: <span>{data.description}</span>
                })
                setModalShow(true)
            }
            console.log(response.data)
        }).catch((error) => {
            setModalContent({
                title: "Ups! hubo un error inesperado al registrar",
                body: <span>Intenta de nuevo mas tarde o habla con un administrador</span>
            })
            setModalShow(true)
            console.log(error)
        }).finally(() => {
            onLoading(false);
        })


    }

    const resetPersonsState = () => {
        setPersons([]);
        setRequiredInputs(true);
    }

    const handleSumbit = (event) => {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        event.preventDefault();
        event.target.reset();
        const clickedButton = event.nativeEvent.submitter.name;
        setDniValue('');

        switch (clickedButton) {
            case 'registerOne':
                register([data])
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
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control required={requiredInputs} minLength={3} maxLength={30} type="text" placeholder="Tu Nombre" name='name' onInput={(e) => e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="input-lastname">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control required={requiredInputs} minLength={3} maxLength={30} type="text" placeholder="Tu Apellido" name='lastname' onInput={(e) => e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '')} />
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
                    <Button variant="primary" type="submit" name="registerAll" onClick={() => setRequiredInputs(persons.length == 0)}>
                        Registrar Todas
                    </Button>
                </div>
            </Form>

        </>
    )
}
