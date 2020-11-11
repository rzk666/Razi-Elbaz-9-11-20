import React, { useState } from 'react';
// Components
import { Card, CircularProgress, withStyles } from '@material-ui/core';

// Styles
import styles from './WeatherCard.module.scss';

// ----- Help Functions ----- //
const getCelcious = (value) => Math.round((value - 32) / 1.8);

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

const WeatherContent = ({ data, currentLocation, tempratureType }) => {
  const {
    WeatherIcon,
    WeatherText,
    Temperature,
    LocalObservationDateTime,
  } = data;
  const { Imperial } = Temperature;
  const { Value } = Imperial;
  const formattedDate = new Date(LocalObservationDateTime).toDateString();
  const formattedTemprature = tempratureType === 'F' ? Value : getCelcious(Value);
  const { city, country } = currentLocation;
  return (
    <div className={styles.content_container}>
      <div className={styles.details_container}>
        <h2>{`${city}, ${country}`}</h2>
        <p>{formattedDate}</p>
        <p>{WeatherText}</p>
        <div className={styles.temprature_container}>
          <span>{`${formattedTemprature} °${tempratureType}`}</span>
          <img
            src={`https://developer.accuweather.com/sites/default/files/${WeatherIcon}-s.png`}
            alt="Weather Icon"
          />
        </div>
      </div>
      <div className={styles.map_container}>
        MAP HERE
      </div>
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

const WeatherCard = ({
  tempratureType,
  currentWeather,
  currentLocation,
}) => {
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
              { !Object.keys(data).length
                ? (
                  <div className={styles.no_location}>
                    Please select a location to get the weather forecast
                  </div>
                )
                : (
                  <>
                    <WeatherContent
                      tempratureType={tempratureType}
                      currentLocation={currentLocation}
                      data={data}
                    />
                    <Forecasts
                      isLoading={forecast.isLoading}
                      headline={headline}
                      daily={daily}
                    />
                  </>
                )}
            </>
          ) }
      </>
    </WeatherContainer>
  );
};

export default WeatherCard;
