import React from 'react'
import { Table } from 'react-bootstrap'

export default function MyTable({ headers, rows, obj }) {
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
          [...Array(rows)].map((_, row) => (
            <tr key={row}>
              {
                Object.keys(obj).map((property) => (
                  <td key={`${property}${obj.id[row]}`}>{obj[property][row]}</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}
