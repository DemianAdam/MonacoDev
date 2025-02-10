import React, { useState } from 'react'
import { Form } from 'react-bootstrap';

export default function BirthDateInput({ onAgeValidityChange, required, setFocus, setIsValid, isValid }) {
    const [errorMessage, setErrorMessage] = useState('');

    const calculateAge = (dateString) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
    const isValidDate = (year, month, day) => {
        const date = new Date(year, month - 1, day); // month is 0-based
        return (
            date.getFullYear() === parseInt(year, 10) &&
            date.getMonth() === parseInt(month, 10) - 1 &&
            date.getDate() === parseInt(day, 10)
        );
    };
    const handleChange = (e) => {
        const dayInput = document.getElementById('input-birth-day');
        const monthInput = document.getElementById('input-birth-month');
        const yearInput = document.getElementById('input-birth-year');

        const day = dayInput.value;
        const month = monthInput.value;
        const year = yearInput.value;

        if (!day || !month || !year) {
            setIsValid(false);
            setErrorMessage('Completa todos los campos.');
            onAgeValidityChange(false);
            return;
        }

        if (!isValidDate(year, month, day)) {
            setIsValid(false);
            setErrorMessage('La fecha ingresada no es válida.');
            onAgeValidityChange(false);
            return;
        }

        const birthDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        const age = calculateAge(birthDate);

        if (isNaN(age) || age < 18) {
            setIsValid(false);
            setErrorMessage('Tenés que tener mas de 18 años.');
            onAgeValidityChange(false);
        } else {
            setIsValid(true);
            setErrorMessage('');
            onAgeValidityChange(true);
        }
    };

    const truncateInput = (e, maxLength) => {
        if (e.target.value.length > maxLength) {
            e.target.value = e.target.value.slice(0, maxLength);
        }
    };

    const getMaxYear = () => {
        const date = new Date();
        return date.getFullYear() - 18;
    }


    return (
        <Form.Group className="mb-3">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <div className='d-flex gap-2'>
                <Form.Control
                    type="number"
                    name='birthDay'
                    required={required}
                    min={1}
                    max={31}
                    id='input-birth-day'
                    onChange={handleChange}
                    isInvalid={!isValid}
                    placeholder='Dia'
                    onKeyDown={(e) => setFocus(e, 'input-birth-month')}
                    onInput={(e) => truncateInput(e, 2)}
                />
                <Form.Control
                    type="number"
                    name='birthMonth'
                    required={required}
                    min={1}
                    max={12}
                    id='input-birth-month'
                    onChange={handleChange}
                    isInvalid={!isValid}
                    placeholder='Mes'
                    onKeyDown={(e) => setFocus(e, 'input-birth-year')}
                    onInput={(e) => truncateInput(e, 2)}
                />
                <Form.Control
                    type="number"
                    name='birthYear'
                    required={required}
                    max={getMaxYear()}
                    id='input-birth-year'
                    onChange={handleChange}
                    isInvalid={!isValid}
                    placeholder='Año'
                    onInput={(e) => truncateInput(e, 4)}
                />
            </div>

            <Form.Control.Feedback type="invalid">
                Tenes que tener mas de 18 años
            </Form.Control.Feedback>
        </Form.Group>
    )
}
