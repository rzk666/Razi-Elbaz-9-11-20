import React, { useState } from 'react';
// Components
import Navbar from '../components/common/Navbar';
import { Paper } from '@material-ui/core';
// Theme
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// ----- MUI Palletes ----- //

const darkPalette = {
  type: 'dark',
  primary: {
    main: '#DA9FDA',
  },
  secondary: {
    main: '#FDA18D',
  },
};

const WithLayoutHOC = (ComposedComponent) => {
  const WithLayout = (props) => {
    const [darkMode, toggleDarkMode] = useState(false);
    const theme = createMuiTheme({
      palette: darkMode ? { ...darkPalette } : {},
    });
    return (
      <ThemeProvider theme={theme}>
        <Paper style={{ height: '100vh', width: '100vw' }}>
          <Navbar toggleDarkMode={() => toggleDarkMode(!darkMode)} />
          <ComposedComponent {...props} />
        </Paper>
      </ThemeProvider>
    );
  };

  return WithLayout;
};

export default WithLayoutHOC;
