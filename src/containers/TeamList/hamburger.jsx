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

const Hamburger = () => {
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

  return(
    <div>
      <React.Fragment key="left">
        <Drawer anchor="Mhhhm Hamburger" open={anchor} onClose={toggleDrawer("left", false)}>
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>

  );
}


  // ^^^^^^^^^^^^^

export default Hamburger;