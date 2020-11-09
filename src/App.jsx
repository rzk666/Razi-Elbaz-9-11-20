import React from 'react';
// Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Universal
import { HOME, FAVORITES } from './universal/pages';
import './App.scss';

const App = () => (
  <>
    <Router>
      <Switch>
        <Route path="/" exact render={(props) => (<HomeIndex {...props} page={HOME} />)} />
        <Route path={`/${FAVORITES}`} exact render={(props) => (<FavoritesIndex {...props} page={FAVORITES} />)} />
      </Switch>
    </Router>
  </>
);

export default App;