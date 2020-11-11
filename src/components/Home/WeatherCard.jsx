import React, { useState } from 'react';
// Components
import {
  Card,
  CircularProgress,
  withStyles,
  Tooltip,
  Divider,
} from '@material-ui/core';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from '@material-ui/icons';
import GoogleMap from '../common/GoogleMap';
import Forecast from '../common/Forecast';
// Animations
import {
  AnimateOpacityHover,
} from '../common/Animations';

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
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})(Card);

const Loader = () => (
  <div className={styles.loader_container}>
    <CircularProgress size={40} />
  </div>
);

const FavoriteButton = ({ isFavorite, city }) => {
  const tooltipText = isFavorite
    ? `Add ${city} to favorites`
    : `Remove ${city} from favorites`;
  return (
    <div className={styles.favorite_container}>
      <AnimateOpacityHover>
        <Tooltip title={tooltipText}>
          { isFavorite
            ? <FavoriteIcon color="error" />
            : <FavoriteBorderIcon color="error" />}
        </Tooltip>
      </AnimateOpacityHover>
    </div>
  );
};

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
        <FavoriteButton city={city} />
      </div>
      <div className={styles.map_container}>
        <GoogleMap geo={{ lat: 22.34, lng: 22.32 }} zoom={8} />
      </div>
    </div>
  );
};

const Forecasts = ({
  tempratureType,
  daily,
  isLoading,
  headline,
}) => {
  const { Text } = headline;
  return (
    <div className={styles.forecasts_container}>
      <h2>5 Days Forecast</h2>
      <div className={styles.forecasts_cards_container}>
        {daily.map((forecast) => (
          <Forecast
            tempratureType={tempratureType}
            isLoading={isLoading}
            data={forecast}
          />
        ))}
      </div>
      {Text && <h3>{`*${Text}`}</h3>}
    </div>
  );
};

// ----- Main Component ----- //
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
            <Loader />
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
                    <Divider />
                    <Forecasts
                      tempratureType={tempratureType}
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
