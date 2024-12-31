import React from 'react'

export default function TableHead({ elements }) {
    return (
        <thead>
            <tr>
                {
                    elements.map((e) =>
                        <th>{e}</th>
                    )
                }
            </tr>
        </thead>
    )
}
