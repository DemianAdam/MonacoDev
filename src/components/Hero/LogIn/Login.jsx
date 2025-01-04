import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import axios from 'axios';

export default function Login({ setHeader }) {
    useEffect(() => {
        setHeader("¡Inicia Sesión!");
    }, [setHeader]);
    const url = "https://script.google.com/macros/s/AKfycbxke3-BJloTrtP6wmLBzSyV44E-BQGIffHM_IWEds067-g5wxKGaPUjmSszVBE0mfDr/exec";

    const testPost = async (data) => {
        const json = JSON.stringify(data)
        
        axios.post(url, json)
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            usuario: e.target.usuario.value,
            contrasena: e.target.contrasena.value
        }


    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="input-username">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Ingresa tu usuario" name='usuario' />
                </Form.Group>

                <Form.Group className="mb-3" controlId="input-password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Ingresa tu contraseña" name='contrasena' autoComplete="on" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Iniciar Sesión
                </Button>
            </Form>
            {<Button onClick={() => testPost({nombre:"wea",apellido:"weon"})}>POST</Button>}
        </>
    )
}
