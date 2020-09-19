import React, { useState } from 'react';
import { Navbar, Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import faker from 'faker'
import { brotliCompress } from 'zlib';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css'



const TeamList = () => {

  const data = new Array(1000).fill().map((value, id) => (({
    id: id,
    title: faker.name.firstName(),
    body: faker.lorem.sentences(8)
  })))

  const [count, setCount] = useState({
    prev: 0,
    next: 10
  })

  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState(data.slice(count.prev, count.next))
  const getMoreData = () => {
    if (current.length === data.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setCurrent(current.concat(data.slice(count.prev + 10, count.next + 10)))
    }, 2000)
    setCount((prevState) => ({ prev: prevState.prev + 10, next: prevState.next + 10 }))
  }

  return (
    
    <div>
      <Navbar className="justify-content-md-center" expand="lg" variant="light" bg="light">
        <Navbar.Brand className="text-center" href="/event">Event Name</Navbar.Brand>
      </Navbar>

      <h3 className="text-center"> Team List </h3>

      <InfiniteScroll
        dataLength={current.length}
        next={getMoreData}
        hasMore={hasMore}
        loader={<h2 className="text-center">Finding More Awesome Teams...</h2>}
      >
      
        <ListGroup variant="flush">
          {current && current.map(((item, index) => (
            <ListGroup.Item key={index} className="mt-3 post">
              <Row className="align-items-center">
                <Col sm={10}><h3>{`${item.title}`}</h3>
                <p>{item.body}</p>
                </Col>
                <Col sm={2}>
                  <h4>3/4</h4>
                  <Button size="lg" variant="outline-primary">Join <FontAwesomeIcon icon="arrow-right" /></Button>
                </Col>
              </Row>
            </ListGroup.Item>
          )))
          }
        </ListGroup>
      </InfiniteScroll>
    </div>
  );
}
  
export default TeamList;
