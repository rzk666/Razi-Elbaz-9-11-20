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
    height: 800,
    width: '75%',
    padding: '0 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})(Card);

const Forecasts = ({ daily }) => {
  const x = 5;
  return (
    <div>
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
        { isLoading ? <CircularProgress />
          : (
            <>
              <div className={styles.top_bar_container}>
                top bar
              </div>
              <div className={styles.content}>
                Content
              </div>
              <Forecasts daily={daily} />
            </>
          ) }
      </>
    </WeatherContainer>
  );
};

export default WeatherCard;
