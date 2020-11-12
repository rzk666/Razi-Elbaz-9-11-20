import React from 'react';
// Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Universal
import { FAVORITES } from './universal/pages';
// Contexts
import DarkModeProvider from './context/ThemeContext';
// Page Components
import HomeIndex from './pages/HomeIndex';
import FavoritesIndex from './pages/FavoritesIndex';

const App = () => (
  <DarkModeProvider>
    <Router>
      <Switch>
        <Route path="/" exact render={(props) => (<HomeIndex {...props} />)} />
        <Route path={`/${FAVORITES}`} exact render={(props) => (<FavoritesIndex {...props} />)} />
      </Switch>
    </Router>
  </DarkModeProvider>
);

export default App;
