import React from 'react';
// Routing
import { Link } from 'react-router-dom';
// Universal
import { HOME, FAVORITES } from '../../universal/pages';
// Components
import {
  AppBar,
  Typography,
} from '@material-ui/core';
// Animations
import { AnimateOpacityHover, AnimateScaleClick } from './Animations';
// Icons
import { Brightness4 as ThemeSwitch } from '@material-ui/icons';
// Styles
import styles from './Navbar.module.scss';

const NavbarLink = ({ to, isActive, children }) => (
  <AnimateOpacityHover>
    <Link to={to} active={isActive}>{children}</Link>
  </AnimateOpacityHover>
);

// TODO -> Handle mobile version later
const Navbar = ({ isMobile, toggleDarkMode }) => {
  const x = 5;
  return (
    <AppBar position="static">
      <div className={styles.navbar_content}>
        <div className={styles.nav_buttons}>
          <NavbarLink to="/" active>Home</NavbarLink>
          <NavbarLink to={`/${FAVORITES}`} active={false}>Favorites</NavbarLink>
        </div>
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
