import React from 'react';
// Utils
import page from '../hocs/page';
// Universal
import { FAVORITES } from '../universal/pages';
// Redux
import { connect } from 'react-redux';
// Components
import FavoritesController from '../controllers/FavoritesController';
import FavoritesView from '../views/FavoritesView';

const Favorites = (props) => <FavoritesController {...props} View={FavoritesView} />;

const mapStateToProps = (state) => ({
  weather: state.weather,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(page(Favorites, FAVORITES));
