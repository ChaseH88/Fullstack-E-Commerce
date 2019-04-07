//This will be used for the main admin page
import styled from "styled-components";

// Main page container and responsive sections
export const PageContainer = styled.section`
  border: 0;
  box-shadow: 0;
  background-color: ${props => props.theme.lightgrey}; 
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  & > div.leftCol {
    flex: 1 1 25%;
  }
  & > div.rightCol {
    flex: 1 1 75%
  }
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    flex-direction: row;
    & > div {
      flex: 1 1 100%;
    }
  }
`;