import React from 'react'
import { Table } from 'react-bootstrap'

export default function PersonsTable({ headers, array }) {
  return (
    <Table>
      <thead>
        <tr>
          {
            headers.map((e, i) =>
              (<th key={i}>{e}</th>)
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          array.map((e, i) => (
            <tr key={i}>
              {
                e.map((e, i) => (
                  <td key={i}>{e}</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}
