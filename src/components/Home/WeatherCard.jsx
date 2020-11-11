import React, { useState } from 'react';
// Components
import { Card, CircularProgress, withStyles } from '@material-ui/core';

// Styles
import styles from './WeatherCard.module.scss';

// ----- Help Components ----- //
const WeatherContainer = withStyles({
  root: {
    borderRadius: 5,
    border: 0,
    height: '100%',
    width: '75%',
    padding: '0 30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})(Card);

const WeatherContent = () => {
  const x = 5;
  return (
    <div className={styles.content_container}>
      Content
    </div>
  );
};

const Forecasts = ({ daily, isLoading }) => {
  const x = 5;
  return (
    <div className={styles.forecasts_container}>
      forecasts
    </div>
  );
};

const WeatherCard = ({ currentWeather }) => {
  const { data, forecast, isLoading } = currentWeather;
  const { headline, daily } = forecast;
  return (
    <WeatherContainer>
      <>
        { isLoading
          ? (
            <div className={styles.loader_container}>
              <CircularProgress size={40} />
            </div>
          )
          : (
            <>
              <WeatherContent />
              <Forecasts
                isLoading={forecast.isLoading}
                headline={headline}
                daily={daily}
              />
            </>
          ) }
      </>
    </WeatherContainer>
  );
};

export default WeatherCard;
