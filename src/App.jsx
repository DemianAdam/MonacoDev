
import { Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import RegisterList from './components/Hero/RegisterList/RegisterList'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Hero/LogIn/Login'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import RegistrationModal from './components/RegistrationModal/RegistrationModal'

function App() {
  const [header, setHeader] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
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
              {
                !loading ?
                  <Routes>
                    <Route
                      path='/Monaco'
                      element={isLogged? <RegisterList
                        setHeader={setHeader}
                        setLoading={setLoading}
                        setModalShow={setModalShow}
                        setModalContent={setModalContent}
                        user={user}
                        setUser={setUser}
                      />:
                      <Navigate replace to='/Monaco/Login' />
                    }
                    />
                    <Route
                      path='/Monaco/Login'
                      element={<Login
                        setHeader={setHeader}
                        setIsLogged={setIsLogged}
                        setUser={setUser}
                        setLoading={setLoading}
                      />}
                    />
                  </Routes> :
                   <LoadingSpinner />
              }

              <RegistrationModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                content={modalContent}
              />
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
