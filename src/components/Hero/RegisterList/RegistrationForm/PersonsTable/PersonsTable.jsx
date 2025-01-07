import React from 'react'
import { Accordion, Table } from 'react-bootstrap'
import './PersonsTable.css'

export default function PersonsTable({ headers, array }) {
  return (
    <Accordion flush>
      {
        array.map((e, i) => (
          <Accordion.Item key={i} eventKey={i}>
            <Accordion.Header>
              {
                <ul className='list-unstyled pe-3'>
                  <li className='lead fw-bold'>{headers[0]}{e[0]}</li>
                  <li className='lead'><strong>Nombre:</strong> {e[1]}</li>
                  <li className='lead'><strong>Apellido:</strong> {e[2]}</li>
                  <li className='lead'><strong>DNI:</strong> {e[3]}</li>
                </ul>
                /* <span className='lead fw-bold'>{headers[0]}{e[0]} Nombre: {e[1]} | Apellido: {e[2]} | DNI:{e[3]}</span>*/
              }
            </Accordion.Header>
            <Accordion.Body>
              {e[5]}
            </Accordion.Body>
          </Accordion.Item>
        ))
      }
    </Accordion>
    
  )
}
