import React, { useState } from 'react';
// Components
import Navbar from '../components/common/Navbar';
import { Paper } from '@material-ui/core';
// Contexts
import { useDarkMode, useToggleDarkMode } from '../context/ThemeContext';
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
    const darkMode = useDarkMode();
    const toggleDarkMode = useToggleDarkMode();
    const [tempratureType, setTempratureType] = useState('F');
    const theme = createMuiTheme({
      palette: darkMode ? { ...darkPalette } : {},
      overrides: {
        MuiCard: {
          root: {
            boxShadow:
          darkMode
            ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
            : '0 3px 5px 2px rgba(0, 0, 0, .3)',
          },
        },
        MuiDivider: {
          root: {
            width: '100%',
            margin: '10px 0',
          },
        },
      },
    });
    return (
      <ThemeProvider theme={theme}>
        <Paper style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
        }}
        >
          <Navbar
            toggleDarkMode={() => toggleDarkMode()}
            setTempratureType={setTempratureType}
            tempratureType={tempratureType}
          />
          <ComposedComponent
            tempratureType={tempratureType}
            {...props}
          />
        </Paper>
      </ThemeProvider>
    );
  };

  return WithLayout;
};

export default WithLayoutHOC;
