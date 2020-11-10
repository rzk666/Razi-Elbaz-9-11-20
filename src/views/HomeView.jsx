import React from 'react';
// Components
import WeatherSearch from '../components/Home/WeatherSearch';
// styles
import styles from './HomeView.module.scss';

const HomeView = ({
  weather,
  fetchWeather,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.search_container}>
      <WeatherSearch fetchWeather={fetchWeather} />
    </div>
  </div>
);

export default HomeView;
