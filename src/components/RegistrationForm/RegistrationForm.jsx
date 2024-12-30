import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DniInput from '../DniInput/DniInput';
import { Alert } from 'react-bootstrap';
import BirthDateInput from '../BirthDateInput/BirthDateInput';
import axios from 'axios';


export default function RegistrationForm() {
    const [errorMessage, setErrorMessage] = useState("");
    const [isAgeValid, setIsAgeValid] = useState(true);
    const handleAgeValidityChange = (validity) => {
        setIsAgeValid(validity);
        setErrorMessage("");  // Clear error message when age is valid
    };
    const url = "https://script.google.com/macros/s/AKfycbyOCy6uvx0oOp0H1CWGC6kSlxSJ2uJeEU_OSzMqS6fbtNsFHp1DL3YD-_8gD76nWZxb0A/exec"
    
    const handleSumbit = async (event) => {

        if (!isAgeValid) {
            setErrorMessage("Debes ser mayor de 18 años para registrarte.");
            return;
        }

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        
        console.log(data)

        try {
            const response = await axios.get(url, {
                params: data,
            });
            if (response.status === 200) {
                console.log("asd")
            }
        } catch (error) {
         console.log(error)   
        }
    };
    
    return (
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
            <Button variant="primary" type="submit">
                Registrate
            </Button>
        </Form>
    )
}
