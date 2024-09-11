import React from "react";
import {
 Box,
 createTheme,
 CssBaseline,
 responsiveFontSizes,
 ThemeProvider,
} from "@material-ui/core";
import RouteWrapper from "./routes/RouteWrapper";

import { Search } from "./components";

let theme = responsiveFontSizes(
 createTheme({
  typography: {
   fontFamily: "Poppins, serif",
  },
  overrides: {
   MuiCssBaseline: {
    "@global": {
     "*": {
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      textTransform: "initial",
     },
     "*::before, *::after": {
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
     },
     "a, li, ul": {
      listStyleType: "none",
      textDecoration: "none",
     },
    },
   },
  },
  breakpoints: {
   values: {
    xs: 0,
    sm: 576,
    md: 992,
    lg: 1200,
    xl: 1400,
   },
  },
 })
);

function App() {
 return (
  <ThemeProvider theme={theme}>
   <CssBaseline />
   <Box className="App">
    {/* <Box
     component={"header"}
     className="App-header"
    >
     <Typography>
      Edit <code>src/App.tsx</code> and save to reload.
     </Typography>
     <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
     >
      Learn React
     </a>
    </Box> */}
    {/* YOUR ROUTES HERE */}
    {/* <Navbar /> */}
    <Search />
    <RouteWrapper />
   </Box>
  </ThemeProvider>
 );
}

export default App;
