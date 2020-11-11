import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// Common

const HomeController = (props) => {
  const {
    // Redux actions
    fetchWeather,
    fetchForecast,
  } = props;

  //   const history = useHistory();
  //   const { location } = history;
  //   const { selectedFavorite } = location;

  const favoritesList = JSON.parse(localStorage.getItem('favorites'));

  // ----- State ----- //
  const [currentLocation, setCurrentLocation] = useState({
    city: '',
    country: '',
    key: '',
    isFavorite: false,
  });

  // ----- useEffects ----- //
  useEffect(() => {
    console.log('MOUNT');
  }, []);

  useEffect(() => {
    const { key } = currentLocation;
    const isFavorite = !!favoritesList.find((x) => key);
    setCurrentLocation({
      ...currentLocation,
      isFavorite,
    });
  }, [currentLocation.key]);

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
      localStorage.setItem('favorites', JSON.parse(favoritesList.filter((x) => x !== key)));
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
