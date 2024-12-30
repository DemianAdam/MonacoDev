import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function DniInput() {
    const [formattedValue, setFormattedValue] = useState('');
    const [isValid, setIsValid] = useState(true);

    const formatDni = (value) => {
        // Remove any non-digit characters
        const digits = value.replace(/\D/g, '');

        // Limit input to 8 digits
        const limitedDigits = digits.slice(0, 8);

        // Apply formatting (xx.xxx.xxx)
        const formatted =
            limitedDigits.length > 5
                ? `${limitedDigits.slice(0, 2)}.${limitedDigits.slice(2, 5)}.${limitedDigits.slice(5)}`
                : limitedDigits.length > 2
                    ? `${limitedDigits.slice(0, 2)}.${limitedDigits.slice(2)}`
                    : limitedDigits;


        setIsValid(limitedDigits.length === 0|| limitedDigits.length  === 8)
        return formatted;
    };

    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        // Check if exactly 8 numbers are entered
        const formatted = formatDni(rawValue);
        setFormattedValue(formatted);

    };

    return (
        <Form.Group className="mb-3" controlId="input-dni">
            <Form.Label>Documento</Form.Label>
            <Form.Control
                type="text"
                placeholder="xx.xxx.xxx"
                name="dni"
                value={formattedValue}
                onChange={handleChange}
                isInvalid={!isValid} // Highlight input if invalid
                required
                minLength={10}
                maxLength={10}
            />
            <Form.Control.Feedback type="invalid">
                Debe ingresar exactamente 8 números.
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default DniInput;
