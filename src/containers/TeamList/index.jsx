import React, { useState } from 'react';
import { Navbar, Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import faker from 'faker'
import { brotliCompress } from 'zlib';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css'

// Drawer/HAMBURGER menu
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import DrawerButton from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const TeamList = () => {

  // Hamburger
  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

  const [anchor, setAnchor] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setAnchor(open);
  };

  const classes = makeStyles({
    list: {
      width: 550,
    },
    fullList: {
      width: 'auto',
    },
  });

  const list = (anchor) => (
    
    <div
      className="dr"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    
    <List>
      <h2 className="text-center">Lobby</h2>
      <br />
      <h3>Current Events:</h3>
        <ul>
          <li>Standford Hacks 2020</li>
          <li>Cake Cooking Competition</li>
          <li>FizzBuzz Showdown</li>
        </ul>
        <hr/>
        <p><FontAwesomeIcon icon="cog" /> Settings</p>
        <p><FontAwesomeIcon icon="sign-out-alt" /> Sign Out</p>

    </List>
    
    
    </div>
    
  );


  // ^^^^^^^^^^^^^


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
      <Navbar className="" expand="lg" variant="light" bg="light">
        <FontAwesomeIcon onClick={toggleDrawer("left", true)} className="" icon="hamburger" />
        <Navbar.Brand className="mx-auto" href="/event">Event Name</Navbar.Brand>
      </Navbar>
     
      <h3 className="text-center"> Team List </h3>
      
      <React.Fragment key="left">
        <Drawer anchor="Mhhhm Hamburger" open={anchor} onClose={toggleDrawer("left", false)}>
          {list(anchor)}
        </Drawer>
      </React.Fragment>

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
