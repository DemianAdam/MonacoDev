import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function DniInput({ value, setValue, requiredInputs, setFocus }) {

    const [isValid, setIsValid] = useState(true);


    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        // Check if exactly 8 numbers are entered
        setIsValid(rawValue.length === 0 || rawValue.length === 3)
        setValue(rawValue);

    };

    return (
        <Form.Group className="mb-3" controlId="input-dni">
            <Form.Label>Ultimos 3 Digitos del DNI</Form.Label>
            <Form.Control
                type="text"
                placeholder="xxx"
                name="dni"
                value={value}
                onChange={handleChange}
                isInvalid={!isValid} // Highlight input if invalid
                required={requiredInputs}
                minLength={3}
                maxLength={3}
                onKeyDown={(e) => setFocus(e, 'input-birthdate')}
            />
            <Form.Control.Feedback type="invalid">
                Debe ingresar exactamente 3 números.
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default DniInput;
