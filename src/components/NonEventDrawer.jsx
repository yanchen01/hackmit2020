import React, { Fragment } from "react";
import { Drawer } from "@material-ui/core";

const NonEventDrawer = ({ toggleDrawer, anchor }) => {
  return (
    <React.Fragment key="left">
      <Drawer anchor="left" open={anchor} onClose={toggleDrawer("left", false)}>
        <h1>test</h1>
      </Drawer>
    </React.Fragment>
  );
};

export default NonEventDrawer;
