import React from 'react';
// Components
import { Skeleton } from '@material-ui/lab';
import { Card, withStyles } from '@material-ui/core';
// Libs
import { getCelcious, getIconId } from '../../common/libs';
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
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})(Card);

// ----- Main Component ----- //
const Forecast = ({
  data, isLoading, tempratureType,
}) => {
  if (isLoading) {
    return (
      <Skeleton
        variant="rect"
        style={{ width: FORECAST_WIDTH, height: FORECAST_HEIGHT }}
        animation="wave"
      />
    );
  }
  const { Day, Temperature } = data;
  const { Maximum, Minimum } = Temperature;
  const formattedTempratures = {
    min: tempratureType === 'F' ? Minimum.Value : getCelcious(Minimum.Value),
    max: tempratureType === 'F' ? Maximum.Value : getCelcious(Maximum.Value),
  };
  const { Icon, IconPhrase } = Day;
  const formattedDate = new Date(data.Date).toDateString();
  return (
    <ForecastContainer className={styles.container}>
      <h2 className={styles.title}>{formattedDate}</h2>
      <div className={styles.details_container}>
        <img src={`https://developer.accuweather.com/sites/default/files/${getIconId(Icon)}-s.png`} alt="" />
        <p>{IconPhrase}</p>
      </div>
      <div className={styles.temprature}>
        {`${formattedTempratures.min}°${tempratureType} - ${formattedTempratures.max}°${tempratureType}`}
      </div>
    </ForecastContainer>
  );
};

export default Forecast;
