
import { Container, Row, Col, Button, ToastContainer } from 'react-bootstrap'
import { useState } from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import RegisterList from './components/RegisterList/RegisterList'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/LogIn/Login'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import RegistrationModal from './components/RegistrationModal/RegistrationModal'
import Toast from 'react-bootstrap/Toast'
function App() {
  const [header, setHeader] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [toastShow, setToastShow] = useState(false);
  const [toastContent, setToastContent] = useState({ title: "", body: "" });
  function setFocus(e, id) {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById(id).focus();
    }
  }
  return (
    <>
      <Row className='w-100'>
        <Header />
      </Row>

      <Row className='w-100 d-flex justify-content-center'>
        <Col sm={5}>
          <Container fluid className='d-flex flex-column align-self-center'>
            <Row className='mb-5'>
              <h2>{header}</h2>
            </Row>
            <Row className='d-flex justify-content-center'>
              {
                !loading ?
                  <Routes>
                    <Route
                      path='/MonacoDev'
                      element={isLogged ? <RegisterList
                        setHeader={setHeader}
                        setLoading={setLoading}
                        setModalShow={setModalShow}
                        setModalContent={setModalContent}
                        user={user}
                        setFocus={setFocus}
                        setToastShow={setToastShow}
                        setToastContent={setToastContent}
                      /> :
                        <Navigate replace to='/MonacoDev/Login' />
                      }
                    />
                    <Route
                      path='/MonacoDev/Login'
                      element={<Login
                        setHeader={setHeader}
                        setIsLogged={setIsLogged}
                        setUser={setUser}
                        setLoading={setLoading}
                        setModalShow={setModalShow}
                        setModalContent={setModalContent}
                        setFocus={setFocus}
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

      <Toast className='position-absolute top-0 start-50 translate-middle-x' bg='success' show={toastShow} onClose={() => setToastShow(false)} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">{toastContent.title}</strong>
        </Toast.Header>
        <Toast.Body>
          {toastContent.body}
        </Toast.Body>
      </Toast>

    </>
  )
}

export default App
