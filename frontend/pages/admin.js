import React, { Component, Fragment } from "react";

// Styled Components
import MainContainer from "../components/styles/MainContainer";

const Admin = props => (
  <Fragment>
    <MainContainer>
      <div className="leftCol">
        <p>LeftCol</p>
          </div>
          <div className="rightCol">
            <p>RightCol</p>
          </div>
        </MainContainer>
      </Fragment>
);

export default Admin;