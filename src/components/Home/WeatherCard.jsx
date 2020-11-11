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
import Forecast from './Forecast';
// Animations
import {
  AnimateOpacityHover,
} from '../common/Animations';
// Libs
import { getCelcious } from '../../common/libs';
// Styles
import styles from './WeatherCard.module.scss';

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

const FavoriteButton = ({
  city,
  isFavorite,
  toggleFavorite,
}) => {
  const tooltipText = !isFavorite
    ? `Add ${city} to favorites`
    : `Remove ${city} from favorites`;
  return (
    <div onClick={() => toggleFavorite()} className={styles.favorite_container}>
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

const WeatherContent = ({
  data,
  currentLocation,
  tempratureType,
  toggleFavorite,
}) => {
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
  const {
    city, country, isFavorite, coords,
  } = currentLocation;
  const { latitude, longitude } = coords;

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
        <FavoriteButton
          toggleFavorite={toggleFavorite}
          city={city}
          isFavorite={isFavorite}
        />
      </div>
      <div className={styles.map_container}>
        <GoogleMap geo={{ lat: latitude, lng: longitude }} zoom={3} />
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
  toggleFavorite,
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
                      toggleFavorite={toggleFavorite}
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
