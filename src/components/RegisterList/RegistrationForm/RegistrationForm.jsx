import React, { useState, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DniInput from './DniInput/DniInput';
import { Alert } from 'react-bootstrap';
import BirthDateInput from './BirthDateInput/BirthDateInput';
import axios from 'axios';
import { useEffect } from 'react';
import PersonsTable from './PersonsTable/PersonsTable';

export default function RegistrationForm({ onLoading, setModalShow, setModalContent, user, setFocus, setToastShow, setToastContent }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [isAgeValid, setIsAgeValid] = useState(true);
    const [dniValue, setDniValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [requiredInputs, setRequiredInputs] = useState(true);
    const [persons, setPersons] = useState([]);
    const [modalMode, setModalMode] = useState(null); // 'view', 'register', or 'error'
    const formRef = useRef(null); // Reference for the form


    useEffect(() => {
        if (modalMode === 'view') {
            const { tableHeaders, tableRows } = generateTableContent(persons, deletePerson);
            setModalContent({
                title: "Personas a registrar",
                body: <PersonsTable headers={tableHeaders} array={tableRows} />,
                footer: <Button onClick={() => { registerAll(persons) }}>Registrar</Button>
            });
        }
    }, [persons, modalMode, setModalContent]);

    //const table = <MyTable headers={tableProps.headers} rows={tableProps.rows} obj={tableProps.persons} />
    const handleAgeValidityChange = (validity) => {
        setIsAgeValid(validity);
        setErrorMessage("");  // Clear error message when age is valid
    };


    const addPerson = (newPerson) => {
        setPersons((prevPersons) => [...prevPersons, newPerson]);
        setToastContent({ title: 'Persona añadida', body: `Se añadió a ${newPerson.name} ${newPerson.lastname} a la lista` });
        setToastShow(true);
    }

    const showModal = (mode, title, body, footer) => {
        setModalMode(mode);
        setModalContent({
            title: title,
            body: body,
            footer: footer
        });
        setModalShow(true);
    }
    const register = (data) => {
        const url = "https://script.google.com/macros/s/AKfycbxke3-BJloTrtP6wmLBzSyV44E-BQGIffHM_IWEds067-g5wxKGaPUjmSszVBE0mfDr/exec"
        onLoading(true)
        const personsMapped = data.map((person) => {
            return {
                name: person.name.trim(),
                lastname: person.lastname.trim(),
                dni: person.dni,
                birthday: `${person.birthYear}-${person.birthMonth}-${person.birthDay}`
            }
        })
        const obj = {
            method: "POST",
            endpoint: "addPersons",
            persons: personsMapped,
            user
        }
        const json = JSON.stringify(obj);
        axios.post(url, json).then((response) => {
            const data = response.data;
            const personsData = data.personsData;
            const userData = data.userData;
            console.log(data)
            if (data.result !== "success") {
                showModal('error', 'Ups! hubo un error al registrar', <span>{data.description}</span>)
                return;
            }
            if (personsData.persons.length === 1) {
                showModal('register', '¡Se Registro Correctamente!', <span>{`Te quedan ${userData.user.remaining} personas para añadir`}</span>)
            }
            else {
                showModal('register',
                    `¡Se Registraron Correctamente ${personsData.news.length} Personas!`,
                    <>
                        <span> {`Hubo ${personsData.duplicates.length} duplicados.`}</span>
                        <span>{`Te quedan ${userData.user.remaining} personas para añadir`}</span>
                    </>)
            }


           resetPersonsState();
        }).catch((error) => {
            showModal('error', 'Ups! hubo un error al registrar', <span>Intenta de nuevo mas tarde o habla con un administrador</span>)
            console.log(error)
        }).finally(() => {
            onLoading(false);
        })


    }

    const resetPersonsState = () => {
        setPersons([]);
        setRequiredInputs(true);
        formRef.current?.reset(); // Reset the form inputs
        setDniValue(''); // Reset custom input value
        setErrorMessage(''); // Clear error messages
    };
    const generateTableContent = (persons, deletePersonCallback) => {
        const tableHeaders = ["#", "Nombre", "Apellido", "DNI", "Fecha de Nacimiento", "Eliminar"];
        const tableRows = persons.map((person, index) => {
            return [
                index + 1,
                person.name.trim(),
                person.lastname.trim(),
                person.dni,
                person.birthday,
                <Button
                    variant="danger"
                    onClick={() => deletePersonCallback(index)}
                >
                    Eliminar
                </Button>,
            ];
        });

        return { tableHeaders, tableRows };
    };

    const deletePerson = (index) => {
        setPersons((prevPersons) => {
            return prevPersons.filter((_, i) => i !== index);
        });
    };

    const handleSumbit = (event) => {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        event.preventDefault();
        if(!isValid){
            setErrorMessage('La fecha ingresada no es valida');
            return;
        }
        const clickedButton = event.nativeEvent.submitter.name;
        console.log(data)

        switch (clickedButton) {
            case 'registerOne':
                setModalMode('register');
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
                const { tableHeaders, tableRows } = generateTableContent(persons, deletePerson);
                showModal('view',
                    'Personas a registrar',
                    <PersonsTable headers={tableHeaders} array={tableRows} />,
                    <Button onClick={() => { registerAll(persons) }}>Registrar</Button>
                )
                break;
        }
    };

    function registerAll(persons) {
        if (persons.length === 0) {
            setErrorMessage("Debes registrar al menos una persona.");
            return;
        }
        register(persons);
        setModalShow(false);
    }



    return (
        <>

            <Form ref={formRef} onSubmit={handleSumbit}>
                <Form.Group className="mb-3" controlId="input-firstname">
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control
                        required={requiredInputs}
                        minLength={3}
                        maxLength={30}
                        type="text"
                        placeholder="Tu Nombre"
                        name='name'
                        onInput={(e) => e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '')}
                        onKeyDown={(e) => setFocus(e, 'input-lastname')}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="input-lastname">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        required={requiredInputs}
                        minLength={3}
                        maxLength={30}
                        type="text"
                        placeholder="Tu Apellido"
                        name='lastname'
                        onInput={(e) => e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '')}
                        onKeyDown={(e) => setFocus(e, 'input-dni')}
                    />
                </Form.Group>

                <DniInput value={dniValue} setValue={setDniValue} required={requiredInputs} setFocus={setFocus} />
                <BirthDateInput onAgeValidityChange={handleAgeValidityChange} required={requiredInputs} setFocus={setFocus} setIsValid={setIsValid} isValid={isValid} />
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
