import React, { useState } from 'react';
import { Navbar, Container, Row, Col, ListGroup } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import faker from 'faker'
import { brotliCompress } from 'zlib';


// Testing purposes
const list = [1, 2, 3];

class GroupList extends React.Component {
  render() {
    var names = this.props.teamNames;
          var namesList = names.map(function(name){
                          return <Team name={name} />;
                        })

          return (
            <div>
              <ul>{ namesList }</ul>
            </div>
          );
  }
}

class Team extends React.Component {
  render() {
    return(
      <Container>
        <div className="rounded-pill border border-dark">
        <Row>
            <Col>{this.props.name} - 3/4</Col>       
        </Row>
        <Row>
            <Col><p>We are the best team around. Plain and simple.</p></Col>
        </Row>
        </div>
        <br />
      </Container>
    );
  }
}

const TeamList = () => {

  const data = new Array(1000).fill().map((value, id) => (({
    id: id,
    title: faker.lorem.words(5),
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
        <Navbar.Brand href="/event">Event Name</Navbar.Brand>
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
            <ListGroup.Item key={index} className="post rounded-pill border border-dark">
              <h3>{`${item.title}-${item.id}`}</h3>
              <p>{item.body}</p>
            </ListGroup.Item>
          )))
          }
        </ListGroup>
      </InfiniteScroll>
    </div>
  );
}
  
/*
    return (
      <div>
        <Navbar className="justify-content-md-center" expand="lg" variant="light" bg="light">
          <Navbar.Brand href="/event">Event Name</Navbar.Brand>
        </Navbar>

        <div className="justify-content-md-center">
          <h1 className="text-center">Team List</h1>
          
          <button> Add Team </button>
          
        </div>  

      </div>

    );
  }
*/
export default TeamList;
