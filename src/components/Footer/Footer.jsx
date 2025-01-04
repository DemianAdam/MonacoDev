import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Anchor } from 'react-bootstrap'
import './Footer.css'
export default function Footer() {
  return (
    <div className='p-2'>

      <a className='no-style-link' href="https://www.instagram.com/monacomc.ofc/">
        <FontAwesomeIcon icon={faInstagram} size='3x' />
      </a>



    </div>
  )
}
