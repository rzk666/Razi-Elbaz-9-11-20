import React from 'react';
// Components
import WeatherSearch from '../components/Home/WeatherSearch';
import WeatherCard from '../components/Home/WeatherCard';
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
    <WeatherCard currentWeather={weather} />
  </div>
);

export default HomeView;
