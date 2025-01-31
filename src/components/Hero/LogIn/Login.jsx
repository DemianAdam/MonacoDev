import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ setHeader, setIsLogged, setUser, setLoading, setModalShow, setModalContent,setFocus }) {
    useEffect(() => {
        setHeader("¡Inicia Sesión!");
    }, [setHeader]);
    const navigate = useNavigate();
    const url = "https://script.google.com/macros/s/AKfycbxke3-BJloTrtP6wmLBzSyV44E-BQGIffHM_IWEds067-g5wxKGaPUjmSszVBE0mfDr/exec";

    const login = (data) => {
        setLoading(true);
        const json = JSON.stringify(data);

        axios.get(url, {
            params: {
                method: "GET",
                endpoint: "login",
                user: json
            }
        }
        ).then((response) => {
            const data = response.data; 
            if (data.result === "success") {
                setIsLogged(true);
                setUser(data.userData.user);
                navigate('/Monaco')
            }
            else {
                setModalContent({ title: "Error", body: "Usuario o contraseña incorrectos" });
                setModalShow(true);
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoading(false);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        login(data);
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="input-username">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Ingresa tu usuario" name='username' onKeyDown={(e)=> setFocus(e,'input-password')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="input-password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Ingresa tu contraseña" name='password' autoComplete="on" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Iniciar Sesión
                </Button>
            </Form>
        </>
    )
}
