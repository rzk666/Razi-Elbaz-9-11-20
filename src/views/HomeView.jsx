import React from 'react';
// Components
import WeatherSearch from '../components/Home/WeatherSearch';
import WeatherCard from '../components/Home/WeatherCard';
// styles
import styles from './HomeView.module.scss';

const HomeView = ({
  weather,
  fetchWeather,
  currentLocation,
  setCurrentLocation,
}) => (
  <div className={styles.wrapper}>
    <WeatherSearch
      setCurrentLocation={setCurrentLocation}
      fetchWeather={fetchWeather}
    />
    <WeatherCard
      currentLocation={currentLocation}
      currentWeather={weather}
    />
  </div>
);

export default HomeView;
