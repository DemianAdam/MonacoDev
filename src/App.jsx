
import { Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import RegisterList from './components/Hero/RegisterList/RegisterList'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Hero/LogIn/Login'

function App() {
  const [header, setHeader] = useState("");

  return (
    <>
      <Row className='w-100'>
        <Header />
      </Row>

      <Row className='w-100 d-flex justify-content-center'>
        <Col sm={5}>
          <Container fluid className='d-flex flex-column align-self-center'>
            <Row className='mb-5'>
              <h1>{header}</h1>
            </Row>
            <Row className='d-flex justify-content-center'>
              <Routes>
                <Route path='/Monaco' element={<RegisterList setHeader={setHeader} />} />
                <Route path='/Monaco/Login' element={<Login setHeader={setHeader} />} />
              </Routes>
            </Row>
          </Container>
        </Col>
      </Row>

      <Row className='w-100'>
        <Footer />
      </Row>


    </>
  )
}

export default App
