import React from 'react';
// Utils
import page from '../hocs/page';
// Universal
import { HOME } from '../universal/pages';
// Redux
import { connect } from 'react-redux';
// Components
import HomeController from '../controllers/HomeController';
import HomeView from '../views/HomeView';

const Home = (props) => <HomeController {...props} View={HomeView} />;

const mapStateToProps = (state) => ({
  weather: state.weather,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(page(Home, HOME));
