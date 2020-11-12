import React from 'react';
// Routing
import { Link, useHistory } from 'react-router-dom';
// Universal
import { FAVORITES } from '../../universal/pages';
// Components
import {
  AppBar,
  withStyles,
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
// Animations
import { AnimateOpacityHover, AnimateScaleClick } from './Animations';
// Icons
import { Brightness4 as ThemeSwitch } from '@material-ui/icons';
// Styles
import styles from './Navbar.module.scss';

// ----- Help Components ----- //
const NavbarLink = ({ to, isActive, children }) => (
  <AnimateOpacityHover initialOpacity={isActive ? 1 : 0.25}>
    <Link to={to}>{children}</Link>
  </AnimateOpacityHover>
);

const ToggleTempratureGroup = withStyles({
  root: {
    marginLeft: 'auto',
    marginRight: '20px',
    height: '80%',
  },
})(ToggleButtonGroup);

const ToggleTemprature = withStyles({
  root: {
    border: '1px solid white',
    borderRadius: 255,
    color: 'rgba(255,255,255,0.5)',
  },
  selected: {
    color: 'white!important',
  },
})(ToggleButton);

// ----- Main Component ----- //
const Navbar = ({
  tempratureType,
  setTempratureType,
  toggleDarkMode,
}) => {
  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  return (
    <AppBar position="static">
      <div className={styles.navbar_content}>
        <div className={styles.nav_buttons}>
          <NavbarLink
            to="/"
            isActive={pathname === '/'}
          >
            Home
          </NavbarLink>
          <NavbarLink
            to={`/${FAVORITES}`}
            isActive={pathname === `/${FAVORITES}`}
          >
            Favorites
          </NavbarLink>
        </div>
        <ToggleTempratureGroup
          exclusive
          value={tempratureType}
          onChange={(e, newType) => {
            if (newType) {
              setTempratureType(newType);
            }
          }}
        >
          <ToggleTemprature value="F">°F</ToggleTemprature>
          <ToggleTemprature value="C">°C</ToggleTemprature>
        </ToggleTempratureGroup>
        <AnimateOpacityHover>
          <AnimateScaleClick>
            <ThemeSwitch onClick={() => toggleDarkMode()} />
          </AnimateScaleClick>
        </AnimateOpacityHover>
      </div>
    </AppBar>
  );
};

export default Navbar;
