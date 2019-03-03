import React, { Component } from "react";
import Header from "./Header";
import Meta from "./Meta";
import styled, { ThemeProvider, injectGlobal } from "styled-components";

// Styled components
import {theme, StyledPage, Container} from "../components/styles/Variables";

class Page extends Component {
  render(){
    return(
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Container>
            {this.props.children}
          </Container>
        </StyledPage>
      </ThemeProvider>
    )
  }
}

export default Page;