import React from 'react';
import { Navbar, Container, Row, Col, ListGroup, Button, Image } from 'react-bootstrap';
import faker from 'faker';
import './index.css';



const Profile = () => {
  return (
    <Container className="w-100 h-100">
        <Row className="justify-content-md-center">
            <h1>{faker.name.firstName()}</h1>
        </Row>
        <Row className="justify-content-md-center">
            <Image src={faker.image.avatar()} roundedCircle />
        </Row>
        
    </Container>
    

  );
}

export default Profile;