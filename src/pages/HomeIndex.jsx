import React from 'react';
// Utils
import page from '../hocs/page';
// Universal
import { HOME } from '../universal/pages';
// Redux
import { connect } from 'react-redux';
// Redux Actions
import {
  fetchWeather,
  fetchForecast,
  weatherGetData,
} from '../redux/models/weather/weatherActions';
// Components
import HomeController from '../controllers/HomeController';
import HomeView from '../views/HomeView';

const Home = (props) => <HomeController {...props} View={HomeView} />;

const mapStateToProps = (state) => ({
  weather: state.weather,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWeather: (Key) => dispatch(fetchWeather(Key)),
  fetchForecast: (Key) => dispatch(fetchForecast(Key)),
  weatherGetData: (data, key) => dispatch(weatherGetData(data, key, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(page(Home, HOME));
