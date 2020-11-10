import React from 'react';
// Components
import WeatherSearch from '../components/Home/WeatherSearch';
// styles
import styles from './HomeView.module.scss';

const HomeView = ({
  weather,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.search_container}>
      <WeatherSearch />
    </div>
  </div>
);

export default HomeView;
