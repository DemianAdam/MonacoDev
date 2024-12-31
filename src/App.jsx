
import { Container, Row, Col } from 'react-bootstrap'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import TableHead from './components/Hero/RegistrationForm/Table/TableHead/TableHead'
import Table from 'react-bootstrap/Table';

function App() {
  const test = [1, 1, 2, 3]

  return (
    <>
      <Row className='w-100'>
        <Header />
      </Row>

      <Row className='w-100 d-flex justify-content-center'>
        <Col sm={5}>
          <Hero />
        </Col>
      </Row>

      <Row className='w-100'>
        <Footer />
      </Row>
      {/*<Table>
        <TableHead elements={test} />
      </Table>*/}

    </>
  )
}

export default App
