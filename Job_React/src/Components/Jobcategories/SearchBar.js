import { Container, Row, Col, Form, Button } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

export default function SearchBar() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center mb-4">
        <Col xs={12}>
          <h1 className="display-5 fw-bold text-dark mb-4">Find Your Dream Job</h1>
        </Col>
      </Row>
      <Row className="justify-content-center g-3">
        <Col xs={12} md={3}>
          <Form.Control
            type="text"
            placeholder="Keywords"
            className="py-2 border rounded-3"
          />
        </Col>
        <Col xs={12} md={3}>
          <Form.Control
            type="text"
            placeholder="Location"
            className="py-2 border rounded-3"
          />
        </Col>
        <Col xs={12} md={3}>
          <Form.Control
            type="text"
            placeholder="Company"
            className="py-2 border rounded-3"
          />
        </Col>
        <Col xs={12} md={2}>
          <Button 
            variant="primary" 
            className="w-100 py-2 rounded-3"
            style={{ backgroundColor: '#2196f3', borderColor: '#2196f3' }}
          >
            Search
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        {/* <Col xs="auto">
          <p className="text-center mb-0">
            <a href="#" className="text-decoration-none" style={{ color: '#2196f3' }}>
              Employers: post a job
            </a>
            {' - your next hire is there'}
          </p>
        </Col> */}
      </Row>
    </Container>
  )
}