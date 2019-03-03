import styled, { injectGlobal } from "styled-components";

// VARIBLES FOR THE SITE CSS
export const theme = {
  baseFont: '1rem',
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '80%',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

// GLOBAL SITE CSS
injectGlobal`
@font-face {
  font-family: 'radnika_next';
  src: url("../../static/radnikanext-medium-webfont.woff2")
  format('woff2');
  font-weight: normal;
  font-style: normal;
}
  html {
    font-size: ${theme.baseFont}
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: radnika_next
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`

// PAGE CSS, ON THE BODY
export const StyledPage = styled.div`
  background: #fff;
  color: ${props => props.theme.black};
`;

// CONTAINER
export const Container = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2vw;
`;