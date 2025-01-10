import React, { useState } from 'react'
import { Form } from 'react-bootstrap';

export default function BirthDateInput({ onAgeValidityChange,required }) {
    const [isValid, setIsValid] = useState(true);
    const calculateAge = (dateString) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const handleChange = (e) => {
        const rawValue = e.target.value;
        const date = rawValue.replace(/-/g, '/');
        const age = calculateAge(date);
        setIsValid((age >= 18 && age <= 50) || rawValue == '');
        onAgeValidityChange(age >= 18 && age <= 50)
    };

    return (
        <Form.Group className="mb-3" controlId="input-birthdate">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
                type="date"
                name='birthday'
                required={required}
                onChange={handleChange}
                isInvalid={!isValid}

                 />
            <Form.Control.Feedback type="invalid">
                Tenes que tener mas de 18 años
            </Form.Control.Feedback>
        </Form.Group>
    )
}
