import React from 'react';
// Components
import { Skeleton } from '@material-ui/lab';
import { Card, withStyles } from '@material-ui/core';
// Styles
import styles from './Forecast.module.scss';

// ----- Consts & Dicts ----- //
const FORECAST_WIDTH = '180px';
const FORECAST_HEIGHT = '250px';

// ----- Help Components ----- //
const ForecastContainer = withStyles({
  root: {
    borderRadius: 5,
    border: 0,
    height: FORECAST_HEIGHT,
    width: FORECAST_WIDTH,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})(Card);

// ----- Main Component ----- //
const Forecast = ({ data, isLoading, tempratureType }) => {
  const x = 5;
  const { Day, Night, Temprature } = data;
  const formattedDate = new Date(data.Date).toDateString();
  if (isLoading) {
    return (
      <Skeleton
        variant="rect"
        style={{ width: FORECAST_WIDTH, height: FORECAST_HEIGHT }}
        animation="wave"
      />
    );
  }
  return (
    <ForecastContainer>
      test
    </ForecastContainer>
  );
};

export default Forecast;
