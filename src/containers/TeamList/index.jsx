import React from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';

class Team extends React.Component {
  render() {
    return(
      <Container fluid>
        <div className="rounded-pill border border-dark">
        <Row>
            <Col>Team Name</Col> 
            <Col>3/4</Col>        
        </Row>
        <Row>
            <Col>Description</Col>
        </Row>
        </div>
      </Container>

    );
  }
}

const TeamList = () => {
  return (
    
    <div>
      <Navbar className="justify-content-md-center" expand="lg" variant="light" bg="dark">
        <Navbar.Brand href="/event">Event Name</Navbar.Brand>
      </Navbar>

      
      <h1>Team List</h1>

      <Team name="BOBb" />
      

    </div>

  );
}

export default TeamList;
