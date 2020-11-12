import React from 'react';
// Utils
import page from '../hocs/page';
// Universal
import { FAVORITES } from '../universal/pages';
// Components
import FavoritesController from '../controllers/FavoritesController';
import FavoritesView from '../views/FavoritesView';

const Favorites = (props) => <FavoritesController {...props} View={FavoritesView} />;

export default (page(Favorites, FAVORITES));
