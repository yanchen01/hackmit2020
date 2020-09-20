import React, { useContext, useEffect } from "react";
import Hamburger from '../Hamburger/hamburger'

const NoMatchPage = () => {
  return (
    <div>
      <Hamburger />
      <h3>
        Looks Like you lost your group... Comeback and find them:{" "}
        <a href="./">Home</a>
      </h3>
    </div>
  );
};

export default NoMatchPage;
