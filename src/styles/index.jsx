import { createGlobalStyle } from "styled-components";

export const darkTheme = {
  body: "#001628",
  text: "#ABDCFF",
  background: "#01213A",
  toggleBorder: "#7BDDF8",
};

export const GlobalStyles = createGlobalStyle(`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
`);
