import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// Common

const HomeController = (props) => {
  const {
    // Redux actions
    fetchWeather,
    fetchForecast,
    weatherGetData,
  } = props;

  const history = useHistory();
  const { location } = history;
  const { currentFavorite, favoriteFullData } = location;

  // Localstorage
  const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
  const lastLocationState = JSON.parse(localStorage.getItem('lastLocation')) || {};

  // ----- State ----- //
  const [currentLocation, setCurrentLocation] = useState(lastLocationState);

  // ----- useEffects ----- //
  useEffect(() => {
    // This means we got here by clicking on a favorite on the favorites page
    if (currentFavorite) {
      const { key } = currentFavorite;
      weatherGetData(favoriteFullData, key);
      fetchForecast(key);
      setCurrentLocation(currentFavorite);
    }
  }, []);

  useEffect(() => {
    const { key } = currentLocation;
    if (key) {
      const isFavorite = !!favoritesList.find((x) => x === key);
      setCurrentLocation({
        ...currentLocation,
        isFavorite,
      });
    }
  }, [currentLocation.key]);

  useEffect(() => {
    localStorage.setItem('lastLocation', JSON.stringify(currentLocation));
  }, [currentLocation]);

  const fetchWeatherWithForcast = (key) => {
    fetchWeather(key);
    fetchForecast(key);
  };

  const toggleFavorite = () => {
    const { key, isFavorite } = currentLocation;
    // This means we need to add favorite to the favorites
    if (!isFavorite) {
      localStorage.setItem('favorites', JSON.stringify([...favoritesList, key]));
    } else {
      localStorage.setItem('favorites', JSON.stringify(favoritesList.filter((x) => x !== key)));
    }
    setCurrentLocation({
      ...currentLocation,
      isFavorite: !isFavorite,
    });
  };

  const { View } = props;
  return (
    <View
      {...props}
      toggleFavorite={toggleFavorite}
      currentLocation={currentLocation}
      setCurrentLocation={setCurrentLocation}
      fetchWeather={fetchWeatherWithForcast}
    />
  );
};

export default HomeController;
